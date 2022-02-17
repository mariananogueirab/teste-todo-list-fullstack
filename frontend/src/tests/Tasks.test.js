/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Tasks from '../components/Tasks';

describe('Testando o componente Tasks', () => {
  it('testando o título h1', () => {
    render(<Tasks />);
    const tasksTitle = screen.getByRole('heading', {
      level: 1,
      name: /Tasks/i,
    });
    expect(tasksTitle).toBeInTheDocument();
  });

  it('testando se o imput select para ordenar as tarefas existe', () => {
    render(<Tasks />);
    const selectInput = screen.getByTestId('order-filter');

    expect(selectInput).toBeInTheDocument();
  });

  it('testando se o imput para adicionar uma nova tarefa existe', () => {
    render(<Tasks />);
    const newTaskInput = screen.getByTestId('new-task-input');

    expect(newTaskInput).toBeInTheDocument();
  });

  it('testando se o imput para adicionar uma nova data existe', () => {
    render(<Tasks />);
    const newDateInput = screen.getByTestId('new-date-input');
    expect(newDateInput).toBeInTheDocument();
  });

  it('testando se não tem tarefas existentes', () => {
    render(<Tasks />);
    const noTasksYet = screen.getByText('No tasks yet');
    expect(noTasksYet).toBeInTheDocument();
  });

  it('testando se o botão para adicionar uma nova tarefa existe', () => {
    render(<Tasks />);
    const plusButton = screen.getByTestId('plus-new-task-btn');
    expect(plusButton).toBeInTheDocument();
  });

  /* it('testando o botão de adicionar nova tarefa', () => {
    render(<Tasks />);
    const newTaskInput = screen.getByTestId('new-task-input');
    const newDateInput = screen.getByTestId('new-date-input');
    const plusButton = screen.getByTestId('plus-new-task-btn');

    userEvent.type(newTaskInput, 'Fazer exercicio da aula X');

    userEvent.type(newDateInput, '2022-03-01');

    fireEvent.click(plusButton);

    const task = screen.getByText(/Fazer exercicio da aula X/i);
    expect(task).toBeInTheDocument();
  }); */
});
