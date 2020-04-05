/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import colors from '../colors';

const styles = {
  container: {
    paddingTop: 60,
    textAlign: 'center'
  },
  header: {
    color: colors.orange.original,
    fontSize: 36,
    fontWeight: 'bold'
  },
  result: {
    color: colors.brown.original,
    fontSize: 24
  },
};

const Results = ({ matches = [] }) => {
  if (matches.length === 0) {
    return (
      <div css={styles.container}>
        <p css={styles.header}>No Matches!</p>
        <p css={styles.result}>You guys suck at this</p>
      </div>
    );
  }

  const results = matches.map(match => {
    const { id, name } = match;

    return <p key={id} css={styles.result}>{name}</p>;
  });

  return (
    <div css={styles.container}>
      <p css={styles.header}>Ok, go eat!</p>
      {results}
    </div>
  );
}

export default Results;
