/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import Toggle from  'react-toggle';
import 'react-toggle/style.css';
import colors from '../colors';

const styles = {
  container: {
    textAlign: 'center',
    color: colors.grey,
    fontSize: 20
  },
  loading: {
    display: 'inline-block',
    paddingRight: 10
  },
  textInput: {
    wrapper: {
      marginTop: 40
    },
    label: {
      position: 'relative',
      display: 'flex'
    },
    radius: {
      position: 'absolute',
      height: 16,
      lineHeight: '16px',
      top: -12,
      left: 8,
      background: '#ffffff',
      padding: 4,
      color: colors.orange.original
    },
    km: {
      position: 'absolute',
      height: 16,
      lineHeight: '16px',
      top: 16,
      right: 8,
      color: colors.orange.original
    },
    input: {
      borderWidth: 2,
      borderStyle: 'solid',
      borderColor: colors.orange.original,
      borderRadius: 3,
      padding: '12px 16px 14px',
      fontSize: 20,
      color: colors.brown,
      display: 'flex',
      flex: 1
    }
  },
  toggle: {
    wrapper: {
      marginTop: 40,
    },
    label: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    toggle: {
      height: 24,
      paddingLeft: 10,
      '.react-toggle--checked .react-toggle-track': {
        backgroundColor: `${colors.orange.original} !important`
      },
      '.react-toggle--checked .react-toggle-thumb': {
        borderColor: `${colors.orange.original} !important`
      }
    }
  },
  categories: {
    wrapper: {
      backgroundColor: `rgb(32, 33, 36, 0.05)`,
      borderRadius: 3,
      padding: 20,
      marginTop: 20
    },
    itemWrapper: {
      padding: 10
    }
  },
  random: {
    button: {
      color: '#ffffff',
      background: colors.grey,
      borderWidth: 2,
      borderColor: colors.grey,
      borderRadius: 6,
      padding: '10px 20px',
      fontSize: 20,
      cursor: 'pointer',
      margin: '0 10px',
      width: 180,
      opacity: 0.5
    },
    buttonSelected: {
    opacity: 1,
    color: '#ffffff',
    background: colors.grey
    }
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
  const [ pickRandom, setPickRandom ] = useState(true);

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

  const handleCategoriesChange = (event, name) => {
    // TODO validate
    const { target: { checked } } = event;
    const updatedCategories = {...categories};
    updatedCategories[name] = checked;
    setCategories(updatedCategories);
  };

  const handleOpenNowChange = event => {
    // TODO validate
    const { target: { checked } } = event;
    setOpenNow(checked);
  };

  const handlePickRandomChange = (event, pickRandom) => {
    event.preventDefault();
    setPickRandom(pickRandom);
  }

  const onSubmit = () => {
    const selectedCategories = restrictCategories ? Object.keys(categories).filter(category => { return categories[category]}) : [];

    startSession({
      radius: parseInt(radius) * 1000,
      categories: selectedCategories,
      openNow,
      pickRandom
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
      <div key={name} css={styles.categories.itemWrapper}>
        <label css={styles.toggle.label}>
          <span>{label}</span>
          <span css={styles.toggle.toggle}>
            <Toggle
              defaultChecked={false}
              icons={false}
              onChange={(e) => handleCategoriesChange(e, name)}
            />
          </span>
        </label>
      </div>
    );
  });

  return (
    <div css={styles.container}>
      <form>
        <div css={styles.textInput.wrapper}>
          <label css={styles.textInput.label}>
            <span css={styles.textInput.radius}>Radius</span>
            <span css={styles.textInput.km}>km</span>
            <input css={styles.textInput.input} type="text" value={radius} onChange={handleRadiusChange} />
          </label>
        </div>
        <div css={styles.toggle.wrapper}>
          <label css={styles.toggle.label}>
            <span>Filter by type</span>
            <span css={styles.toggle.toggle}>
              <Toggle
                defaultChecked={false}
                icons={false}
                onChange={handleRestrictCategoriesChange}
              />
            </span>
          </label>
        </div>
        {restrictCategories && (
          <div css={styles.categories.wrapper}>
            {categoryInputs}
          </div>
        )
        }
        <div css={styles.toggle.wrapper}>
          <label css={styles.toggle.label}>
            <span>Open now?</span>
            <span css={styles.toggle.toggle}>
              <Toggle
                defaultChecked={false}
                icons={false}
                onChange={handleOpenNowChange}
              />
            </span>
          </label>
        </div>
        <div css={styles.toggle.wrapper}>
        <p>Show me:</p>
        <button css={[styles.random.button, pickRandom && styles.random.buttonSelected]} onClick={e => handlePickRandomChange(e, true)}>
          Random match
        </button>
        <button css={[styles.random.button, !pickRandom && styles.random.buttonSelected]} onClick={e => handlePickRandomChange(e, false)}>
          All matches
        </button>
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
