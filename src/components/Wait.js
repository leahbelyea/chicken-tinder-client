/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import colors from '../colors';

const styles = {
  container: {
    paddingTop: 60,
    color: colors.brown.original,
    fontSize: 24,
    textAlign: 'center'
  }
};

const Wait = () => {
  return (
    <div css={styles.container}>
      <p>You're all done! Waiting for your partner...</p>
      <FontAwesomeIcon icon={faUtensils} color={colors.brown.original} spin />
    </div>
  );
}

export default Wait;
