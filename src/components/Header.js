/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDrumstickBite, faFire } from '@fortawesome/free-solid-svg-icons';
import colors from '../colors';

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'center'
  },
  iconWrapper: {
    fontSize: 160,
    display: 'inline-block',
    padding: 10
  }
};

const Header = () => {
  return (
    <header css={styles.header}>
      <div css={styles.iconWrapper}>
        <FontAwesomeIcon icon={faDrumstickBite} color={colors.brown} />
      </div>
      <div css={styles.iconWrapper}>
        <FontAwesomeIcon icon={faFire} color={colors.orange.original} />
      </div>
    </header>
  );
}

export default Header;
