/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Header from '../components/Header';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando o componente Header', () => {
  it('testando a logo', () => {
    render(<Header />);
    const logo = screen.getByRole('img');

    expect(logo).toBeInTheDocument();
  });

  it('testando o username', () => {
    render(<Header />);
    const username = screen.getByTestId('username-testid');

    expect(username).toBeInTheDocument();
  });

  it('testando o username', () => {
    const { history } = renderWithRouter(<Header />);
    const logout = screen.getByTestId('logout-testid');
    expect(logout).toBeInTheDocument();

    userEvent.click(logout);
    const { pathname } = history.location;
    expect(pathname).toBe('/get-in');
  });
});
