import React from 'react';
import { screen } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('1 - Test not found page', () => {
  test('Not found text', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByText(/not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
