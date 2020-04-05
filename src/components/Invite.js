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
  waiting: {
    color: colors.brown.original,
    fontSize: 24,
    marginTop: 60,

    span: {
      paddingLeft: 20
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
    }
  }
};

const Invite = ({roomId}) => {
  const [buttonText, setButtonText] = useState('Copy Invite Link');

  const inviteLinkToClipboard = () => {
    const currentUrl = window.location;
    const linkUrl = `${currentUrl.protocol}//${currentUrl.host}/${roomId}`;
    navigator.clipboard.writeText(linkUrl).then(() => {
      setButtonText('Invite Link Copied!');
    });
  }

  return (
    <div css={styles.container}>
      <div css={styles.waiting}>
        <FontAwesomeIcon icon={faUtensils} color={colors.brown.original} spin />
        <span>Waiting for your partner</span>
      </div>
      <button css={styles.button} onClick={inviteLinkToClipboard}>
        {buttonText}
      </button>
    </div>
  );
}

export default Invite;
