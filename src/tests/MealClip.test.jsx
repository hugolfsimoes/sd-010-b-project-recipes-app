import { screen } from '@testing-library/dom';
import React from 'react';
import { MealClip } from '../components';
import renderWithRouter from './renderWithRouter';

describe('MealClip Component', () => {
  describe('Elements that be must displayed', () => {
    it('Should display a element section with a text inside of it', () => {
      renderWithRouter(<MealClip />);
      expect(screen.getByText(/não temos vídeo para essa receita/i)).toBeInTheDocument();
    });

    it('Should display...', () => {
      const { getByTestId } = renderWithRouter(
        <MealClip
          strYoutube="https://www.youtube.com/watch?v=4aZr5hZXP_s"
          strMeal="Teriyaki Chicken Casserole"
        />,
      );
      const iframe = getByTestId('video');
      expect(iframe).toBeInTheDocument();
      expect(iframe).toHaveAttribute('src', 'https://www.youtube.com/embed?v=4aZr5hZXP_s');
      expect(iframe).toHaveAttribute('title', 'Teriyaki Chicken Casserole');
    });
  });
});
