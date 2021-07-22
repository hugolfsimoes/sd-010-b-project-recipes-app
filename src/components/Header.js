import PropTypes from 'prop-types';
import React, { useState } from 'react';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import SearchFood from './SearchFood';

function Header({ title, display }) {
  const [isSerching, setIsSerching] = useState(false);
  return (
    <div className="header-body">
      <div className="header-class">

        <a
          href="/perfil"
        >
          <img
            className="icon-perfil"
            data-testid="profile-top-btn"
            src={ profileIcon }
            alt="profile icon"

          />
        </a>

        <div data-testid="page-title" className="header-title">
          {title}
        </div>
        <div>
          {
            display === 'true'
        && (
          <img
            className="icon-search"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
            onClick={ () => setIsSerching(!isSerching) }
            role="presentation"
          />)
          }
        </div>
      </div>
      {isSerching && <SearchFood recipe={ title } />}
    </div>
  );
}

Header.propTypes = {
  display: PropTypes.string,
  title: PropTypes.string,
}.isRequired;

export default Header;
