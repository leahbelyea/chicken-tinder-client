/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { jsx } from '@emotion/core';
import SwipeableViews from 'react-swipeable-views';
import { virtualize } from 'react-swipeable-views-utils';
import { mod } from 'react-swipeable-views-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import colors from '../colors';

const VirtualizeSwipeableViews = virtualize(SwipeableViews);

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 60
  },
  panel: {
    height: 200,
    textAlign: 'center'
  },
  name: {
    color: colors.orange.original,
    fontSize: 36,
    fontWeight: 'bold'
  },
  location: {
    color: colors.brown.original,
    fontSize: 24
  },
  waiting: {
    color: colors.brown.original,
    fontSize: 24
  },
  counter: {
    display: 'flex',
    width: 40,
    height: 40,
    borderRadius: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    lineHeight: '40px',
    justifyContent: 'center',
    background: colors.orange.original
  }
};

const Swipe = ({choices = [], onDone}) => {
  const [ remainingChoices, setRemainingChoices ] = useState([]);
  const [ remainingChoicesUnset, setRemainingChoicesUnset ] = useState(true);
  const [ approvedChoices, setApprovedChoices ] = useState([]);

  // Once choices has loaded, set it to remainingChoices. But only do this once
  useEffect(() => {
    if (choices.length > 0 && remainingChoicesUnset) {
      setRemainingChoices(choices);
      setRemainingChoicesUnset(false);
      slideRenderer(0, 0);
    }
  }, [choices]);

  // Once user has swiped all choices, send choice ids back to server
  useEffect(() => {
    if (remainingChoices.length === 0 && !remainingChoicesUnset) {
      onDone(approvedChoices.map(({id}) => { return id; }));
    }
  }, [remainingChoices]);

  const slideRenderer = params => {
    const { index } = params;
    const numSlides = remainingChoices.length;
    const choiceIndex = mod(index, remainingChoices.length);
    const { name, location } = remainingChoices[choiceIndex] || {};
    const address = location ? location.address1 : null;

    return (
      <div css={styles.panel} key={index}>
        <p css={styles.name}>{name}</p>
        <p css={styles.location}>{address}</p>
      </div>
    );
  }

  const handleSwipe = (index, lastIndex) => {
    const choiceIndex = mod(lastIndex, remainingChoices.length);
    const swipedRight = index === lastIndex - 1;
    // if user swiped right, add choice to approved choices
    if (swipedRight) {
      setApprovedChoices([
        ...approvedChoices,
        remainingChoices[choiceIndex]
      ]);
    }
    // remove choice from array now that user has swiped it
    setRemainingChoices(
      remainingChoices.filter((choice, index) => {
        return index !== choiceIndex;
      })
    );
  }

  return (
    <div css={styles.container}>
      { remainingChoices.length > 0 && <div css={styles.counter}>{remainingChoices.length}</div> }
      <VirtualizeSwipeableViews
        enableMouseEvents
        slideRenderer={slideRenderer}
        onChangeIndex={handleSwipe}
    />
    </div>
  );
}

export default Swipe;
