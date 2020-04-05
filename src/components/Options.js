/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import colors from '../colors';

const styles = {
  container: {
    textAlign: 'center'
  },
  text: {
    color: colors.brown.original,
    fontSize: 24,
    marginTop: 60,
    marginBottom: 0
  },
  loading: {
    display: 'inline-block',
    paddingRight: 10
  },
  button: {
    fontSize: 24,
    border: 'none',
    background: colors.orange.original,
    color: '#ffffff',
    padding: 20,
    borderRadius: 6,
    display: 'inline-block',
    width: 310,
    transition: 'background 0.3s ease',
    marginTop: 40,
    cursor: 'pointer',

    ':hover,:focus': {
      background: colors.orange.dark
    },

    ':disabled': {
      cursor: 'auto',
      opacity: 0.4,

      ':hover,:focus': {
        background: colors.orange.original
      },
    }
  }
};

const Options = ({startSession, fetchingLocation}) => {
  const [ radius, setRadius ] = useState(7);
  const [ restrictCategories, setRestrictCategories ] = useState(false);
  const [ categories, setCategories ] = useState({});
  const [ openNow, setOpenNow ] = useState(false);
  const [ resultType, setResultType ] = useState('random');

  const handleRadiusChange = event => {
    // TODO validate
    const { target: { value } } = event;
    setRadius(event.target.value);
  };

  const handleRestrictCategoriesChange = event => {
    // TODO validate
    const { target: { checked } } = event;
    setRestrictCategories(checked);
  };

  const handleCategoriesChange = event => {
    // TODO validate
    const { target: { name, checked } } = event;
    const updatedCategories = {...categories};
    updatedCategories[name] = checked;
    setCategories(updatedCategories);
  };

  const handleOpenNowChange = event => {
    // TODO validate
    const { target: { checked } } = event;
    setOpenNow(checked);
  };

  const handleResultTypeChange = event => {
    const { target: { value } } = event;
    setResultType(value);
  }

  const onSubmit = () => {
    const selectedCategories = restrictCategories ? Object.keys(categories).filter(category => { return categories[category]}) : [];

    startSession({
      radius: parseInt(radius) * 1000,
      categories: selectedCategories,
      openNow,
      pickRandom: resultType === 'random'
    });
  };

  const categoryChoices = [
    { label: 'Fast Food', name: 'hotdogs' },
    { label: 'Pubs', name: 'pubs,brewpubs,gastropubs' },
    { label: 'Pizza', name: 'pizza' },
    { label: 'Chinese', name: 'chinese' },
    { label: 'Breakfast', name: 'breakfast_brunch' },
  ]
  const categoryInputs = categoryChoices.map(({label, name}) => {
    return (
      <div key={name}>
        <label>
          {label}
          <input
            name={name}
            type="checkbox"
            checked={categories[name]}
            onChange={handleCategoriesChange}
           />
        </label>
      </div>
    );
  });

  return (
    <div css={styles.container}>
      <p css={styles.text}>Pick your options!</p>
      <form>
        <div>
          <label>
            Radius
            <input type="text" value={radius} onChange={handleRadiusChange} />
            <span>km</span>
          </label>
        </div>
        <div>
          <label>
            Restrict Categories
            <input
              name="restrictCategories"
              type="checkbox"
              checked={restrictCategories}
              onChange={handleRestrictCategoriesChange}
             />
          </label>
        </div>
        {restrictCategories && categoryInputs}
        <div>
          <label>
            Open now?
            <input
              name="openNow"
              type="checkbox"
              checked={openNow}
              onChange={handleOpenNowChange}
             />
          </label>
        </div>
        <div>
          <label>
            How do you want your results
            <select value={resultType} onChange={handleResultTypeChange}>
              <option value="random">Pick a random match</option>
              <option value="all">Show all matches</option>
            </select>
          </label>
        </div>
      </form>
      <button css={styles.button} onClick={onSubmit} disabled={fetchingLocation}>
        {fetchingLocation && <div css={styles.loading}><FontAwesomeIcon icon={faUtensils} color="#ffffff" spin /></div>}
        {fetchingLocation ? 'Getting Your Location' : `Let's Do This!`}
      </button>
    </div>
  );
}

export default Options;
