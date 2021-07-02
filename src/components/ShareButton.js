import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import UserContext from '../context/user.context';

import shareIcon from '../images/shareIcon.svg';

function ShareButton() {
  const { setShowMessage } = useContext(UserContext);
  const history = useHistory();
  const { location: { pathname } } = history;
  return (
    <button
      type="button"
      className="button-svg"
      onClick={ () => {
        copy(`http://localhost:3000${pathname}`);
        setShowMessage(true);
      } }
      data-testid="share-btn"
    >
      <img src={ shareIcon } alt="Compartilhar" />
    </button>
  );
}

export default ShareButton;
