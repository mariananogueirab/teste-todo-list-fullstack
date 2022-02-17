/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import EveryDayList from '../components/EveryDayList';

describe('Testando o componente EveryDayList', () => {
  it('testando o título h1', () => {
    render(<EveryDayList />);
    const everyDayListTitle = screen.getByRole('heading', {
      level: 1,
      name: /Every Day List/i,
    });
    expect(everyDayListTitle).toBeInTheDocument();
  });

  it('testando se o imput select para ordenar as tarefas existe', () => {
    render(<EveryDayList />);
    const selectInput = screen.getByTestId('order-filter');

    expect(selectInput).toBeInTheDocument();
  });

  it('testando se o imput para adicionar uma nova tarefa existe', () => {
    render(<EveryDayList />);
    const newTaskInput = screen.getByTestId('new-task-input');

    expect(newTaskInput).toBeInTheDocument();
  });

  it('testando se não tem eventos existentes', () => {
    render(<EveryDayList />);
    const noEveryDayListYet = screen.getByText('No tasks yet');
    expect(noEveryDayListYet).toBeInTheDocument();
  });

  it('testando se o botão para adicionar uma nova tarefa existe', () => {
    render(<EveryDayList />);
    const plusButton = screen.getByTestId('plus-new-task-btn');
    expect(plusButton).toBeInTheDocument();
  });

  /* it('testando o botão de adicionar nova tarefa', () => {
    render(<EveryDayList />);
    const newTaskInput = screen.getByTestId('new-task-input');

    const plusButton = screen.getByTestId('plus-new-task-btn');

    userEvent.type(newTaskInput, 'Academia');

    fireEvent.click(plusButton);

    const task = screen.queryByText('Academia');
    expect(task).toBeTruthy();
  }); */
});
