import React from 'react';
import panela from '../images/panela.gif';
import '../styles/loading.css';

function OtherLoader() {
  return (
    <div className="loader">
      <img src={ panela } alt="Loader" />
    </div>
  );
}

export default OtherLoader;
