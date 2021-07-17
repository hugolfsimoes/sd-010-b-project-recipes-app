import React from 'react';
import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';
import { BiDrink } from 'react-icons/bi';
import { MdExplore } from 'react-icons/md';

import '../styles/footer.css';

function Footer() {
  return (
    <footer className="footer-container" data-testid="footer">
      <Link to="/bebidas">
        <BiDrink size={ 40 } color="#ec9953" />
      </Link>
      <Link to="/explorar">
        <MdExplore size={ 40 } color="#ec9953" />
      </Link>
      <Link to="/comidas">
        <GiKnifeFork size={ 40 } color="#ec9953" />
      </Link>
    </footer>
  );
}

export default Footer;
