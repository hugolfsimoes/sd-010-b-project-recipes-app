import React, { useEffect, useState } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

export default function Header({ pageName }) { // Desestruturação de props
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false); // Redirect Perfil
  const [showSearchBar, setBar] = useState(false); // state component to search

  if (isRedirect) return <Redirect to="/perfil" />;

  const showSearch = () => {
    if (pathname.includes('/explorar')) { setShow(true); }
  };

  useEffect(showSearch, []);

  return (
    <>
      <header className="header">
        <input
          type="image"
          onClick={ () => setIsRedirect(true) }
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="perfil"
        />
        <h1
          data-testid="page-title"
        >
          { pageName }
        </h1>
        (show)?
        <div>
          <input
            type="image"
            onClick={ () => setBar(!showSearchBar) }
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search"
          />
        </div>
        :
        {' '}
        <div />
      </header>
      <div>
        { !showSearchBar || <SearchBar />}
      </div>
    </>
  );
}

Header.propTypes = {
  pageName: PropTypes.string.isRequired,
};
