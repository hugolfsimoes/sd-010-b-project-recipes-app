import React from 'react';
import PropTypes from 'prop-types';
import plateGif from '../images/plate.gif';
import panGif from '../images/pan.gif';
import '../styles/otherLoader.css';

function OtherLoader({ category }) {
  return (
    <div className="loader">
      <img src={ category === 'Dessert' ? plateGif : panGif } alt="Loader" />
    </div>
  );
}

export default OtherLoader;

OtherLoader.propTypes = {
  category: PropTypes.string.isRequired,
};
