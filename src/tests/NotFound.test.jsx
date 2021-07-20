import { screen } from '@testing-library/dom';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from './renderWithRouter';

describe('NotFound Component', () => {
  describe('Elements that must be displayed', () => {
    it('Should have a text "not found"', () => {
      renderWithRouter(<NotFound />);
      expect(screen.getByText(/not found/i)).toBeInTheDocument();
    });
  });
});
