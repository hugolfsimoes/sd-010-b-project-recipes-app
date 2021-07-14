// import userEvent from '@testing-library/user-event';
import React from 'react';
import { ShareBtn } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Sharer Button', () => {
  describe('Elements', () => {
    it('Should render a button with name "ícone de compartilhar"', () => {
      const { getByRole } = renderWithRouter(<ShareBtn />);
      const shareBtn = getByRole('button', { name: /ícone de compartilhar/i });
      expect(shareBtn).toBeInTheDocument();
    });
    it('Should render a img inside the button', () => {
      const { getByRole } = renderWithRouter(<ShareBtn />);
      const imageBtn = getByRole('img', { name: /ícone de compartilhar/i });
      expect(imageBtn).toBeInTheDocument();
      expect(imageBtn).toHaveAttribute('alt', 'Ícone de compartilhar');
      expect(imageBtn).toHaveAttribute('src', 'shareIcon.svg');
      expect(imageBtn).toHaveAttribute('class', 'small-btn');
    });
  });
  // describe('Behavior', () => {
  //   it('Should execute copyLink', () => {
  //     const onClick = jest.fn();
  //     const { getByRole } = renderWithRouter(<ShareBtn onClick={ onClick } />);

  //     const shareBtn = getByRole('button', { name: /ícone de compartilhar/i });
  //     userEvent.click(shareBtn);
  //     expect(shareBtn).toHaveBeenCalledTimes(1);
  //   });
  // });
});
