import React, { useEffect, useState } from 'react';
import api from '../api';
import Button from './Button';
import Input from './Input';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newLimitDate, setNewLimitDate] = useState('');

  useEffect(async () => {
    try {
      const response = await api.get('/tasks', {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      });
      setTasks(response.data);
    } catch (error) {
      alert(error);
    }
  }, [newTask]);

  const addTask = async () => {
    let response;
    try {
      response = await api.post('/tasks', { task: newTask, limitDate: newLimitDate }, {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
      setNewLimitDate('');
    } catch (error) {
      console.log(error);
      alert(response.data.message); // não do conseguindo colocar o erro do back aqui
    }
  };

  const alphabeticalOrder = async () => {
    try {
      const response = await api.get('/tasks/alphabetical', {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      });
      setTasks(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const dateOrder = async () => {
    try {
      const response = await api.get('/tasks/date', {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      });
      setTasks(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div>
      <Button label="Ordem Alfabética" onClick={alphabeticalOrder} />
      <Button label="Ordenar por data de criação" onClick={dateOrder} />

      {tasks.map(({ _id, task }) => (
        <li key={_id}>{task}</li>
      ))}

      <Input type="text" value={newTask} label="New Task" onChange={({ target }) => setNewTask(target.value)} />
      <Input type="text" value={newLimitDate} label="New Limit Date" onChange={({ target }) => setNewLimitDate(target.value)} />

      <Button label="Add Task" onClick={addTask} />
    </div>
  );
}
export default Tasks;
