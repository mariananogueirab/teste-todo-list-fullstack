/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Commitments from '../components/Commitments';

describe('Testando o componente Commitments', () => {
  it('testando o título h1', () => {
    render(<Commitments />);
    const commitmentsTitle = screen.getByRole('heading', {
      level: 1,
      name: /Commitments/i,
    });
    expect(commitmentsTitle).toBeInTheDocument();
  });

  it('testando se o imput select para ordenar os eventos existe', () => {
    render(<Commitments />);
    const selectInput = screen.getByTestId('order-filter');

    expect(selectInput).toBeInTheDocument();
  });

  it('testando se o imput para adicionar um novo evento existe', () => {
    render(<Commitments />);
    const newTaskInput = screen.getByTestId('new-commitment-input');

    expect(newTaskInput).toBeInTheDocument();
  });

  it('testando se o imput para adicionar uma nova data existe', () => {
    render(<Commitments />);
    const newDateInput = screen.getByTestId('new-date-input');
    expect(newDateInput).toBeInTheDocument();
  });

  it('testando se não tem eventos existentes', () => {
    render(<Commitments />);
    const noCommitmentsYet = screen.getByText('No commitments yet');
    expect(noCommitmentsYet).toBeInTheDocument();
  });

  it('testando se o botão para adicionar um novo evento existe', () => {
    render(<Commitments />);
    const plusButton = screen.getByTestId('plus-new-commitment-btn');
    expect(plusButton).toBeInTheDocument();
  });

  /* it('testando o botão de adicionar novo evento', () => {
    render(<Commitments />);
    const newCommitmentInput = screen.getByTestId('new-commitment-input');
    const newDateInput = screen.getByTestId('new-date-input');
    const plusButton = screen.getByTestId('plus-new-commitment-btn');

    userEvent.type(newCommitmentInput, 'Aniversário Carina');

    userEvent.type(newDateInput, '2022-05-16');

    fireEvent.submit(plusButton);

    const task = screen.getByText('Aniversário Carina');
    expect(task).toBeInTheDocument();
  }); */
});
