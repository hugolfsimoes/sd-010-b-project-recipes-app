import React from 'react';
import rockGlass from '../images/rockGlass.svg';

export default function Loading() {
  return (
    <div className="loading-app">
      <object
        className="rocksGlass"
        type="image/svg+xml"
        data={ rockGlass }
        width="100"
      >
        Glass
      </object>
      <span className="logo">Loading...</span>
    </div>
  );
}
