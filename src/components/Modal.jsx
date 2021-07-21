import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ScrollLock from 'react-scrolllock';
import Smile from '../images/image8.png';
import { isLink } from '../action/details';

import '../css/Modal.css';

function Modal({ children, history, link }) {
  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal') link(false);
  };

  return (
    <section
      id="modal"
      className="modal"
      onClick={ handleOutsideClick }
      onKeyPress={ handleOutsideClick }
      role="presentation"
    >
      <ScrollLock isActive={ link !== true } />
      <div className="modal-container">
        <img className="modal-img" src={ Smile } alt="smile" />
        <div className="modal-content">{children}</div>
        <button
          className="modal-btn"
          type="button"
          onClick={ () => {
            history.push('/comidas');
            link(false);
          } }
        >
          Back to Home
        </button>
      </div>
    </section>
  );
}

const mapDispatchToProps = (dispatch) => ({
  link: (bool) => dispatch(isLink(bool)),
});

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  history: PropTypes.string.isRequired,
  link: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Modal);
