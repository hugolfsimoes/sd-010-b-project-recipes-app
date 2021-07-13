import React from 'react';
import 'mutationobserver-shim';
import { Router } from 'react-router-dom';
import { screen, render, waitFor } from '@testing-library/react';
import { createBrowserHistory } from 'history';
import App from '../App';

const renderPath = (path) => {
  const history = createBrowserHistory();
  history.push(path);
  const { ...resources } = render(
    <Router history={ history }>
      <App />
    </Router>,
  );
  return { ...resources };
};

export default renderPath;
