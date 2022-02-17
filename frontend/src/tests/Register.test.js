/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Register from '../components/Register';
import renderWithRouter from './utils/renderWithRouter';

describe('Testando o componente Register', () => {
  it('testando o imput "Username"', () => {
    render(<Register />);
    const usernameInput = screen.getByTestId('username-input');

    expect(usernameInput).toBeInTheDocument();
  });

  it('testando o imput "Email"', () => {
    render(<Register />);
    const emailInput = screen.getByTestId('email-input');

    expect(emailInput).toBeInTheDocument();
  });

  it('testando o imput "Password"', () => {
    render(<Register />);
    const passwordInput = screen.getByTestId('password-input');

    expect(passwordInput).toBeInTheDocument();
  });

  it('testando se o botão "Entrar" existe', () => {
    render(<Register />);
    const entrarButton = screen.getByTestId('register-submit-btn');
    expect(entrarButton).toBeInTheDocument();
  });

  it('testando o botão "Entrar"', () => {
    const { history } = renderWithRouter(<Register />);

    const usernameInput = screen.getByTestId('username-input');
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const entrarButton = screen.getByTestId('register-submit-btn');

    userEvent.type(usernameInput, 'pedroavelar');

    userEvent.type(emailInput, 'peu@trybe.com');

    userEvent.type(passwordInput, 'peu1234');

    fireEvent.submit(entrarButton);

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');
  });
});
