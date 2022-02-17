/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Home from '../pages/Home';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando os componentes da página Home', () => {
  it('testando a logo', () => {
    render(<Home />);
    const logo = screen.getByRole('img');

    expect(logo).toBeInTheDocument();
  });

  it('testando o botão "GET IN"', () => {
    const { history } = renderWithRouter(<Home />);
    const getInButton = screen.getByRole('button');
    expect(getInButton).toBeInTheDocument();

    userEvent.click(getInButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/get-in');
  });
});
