import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  BsXLg, BsCheckLg, BsPlusLg, BsPencilFill,
} from 'react-icons/bs';
import api from '../api';
import Input from './Input';
import '../styles/tasks.css';
import Select from './Select';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newLimitDate, setNewLimitDate] = useState('');
  const orderOptions = ['', 'alphabetical', 'date', 'status'];
  const [orderValue, setOrderValue] = useState('');
  const history = useHistory();
  const authorization = localStorage.getItem('authorization');
  const [taskForUpdate, setTaskForUpdate] = useState('');
  const [limitDateForUpdate, setLimitDateForUpdate] = useState('');
  const [updateField, setUpdateField] = useState({
    id: '',
    status: false,
  });

  useEffect(async () => {
    if (!authorization) history.push('/get-in');
    try {
      const response = await api.get(`/tasks/${orderValue}`, {
        headers: {
          authorization,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [newTask, orderValue, updateField]);

  const addTask = async () => {
    let response;
    try {
      response = await api.post('/tasks', { task: newTask, limitDate: newLimitDate }, {
        headers: {
          authorization,
        },
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
      setNewLimitDate('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`, {
        headers: {
          authorization,
        },
      });
      const newtasks = tasks.filter(({ _id }) => _id !== id);
      setTasks(newtasks);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const concludedTask = async (id) => {
    try {
      await api.put(`/tasks/completed/${id}`, {}, {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      });
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const update = async (id) => {
    try {
      await api.put(`/tasks/${id}`, { task: taskForUpdate, limitDate: limitDateForUpdate }, {
        headers: {
          authorization,
        },
      });
      setUpdateField({ id: '', status: false });
      setTaskForUpdate('');
      setLimitDateForUpdate('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const updateTask = (id) => {
    if (updateField.status && updateField.id === id) {
      return (
        <div className="edit">
          <Input type="text" value={taskForUpdate} label="Edit Task" onChange={({ target }) => setTaskForUpdate(target.value)} />
          <Input type="date" value={limitDateForUpdate} label="Edit Limit Date" onChange={({ target }) => setLimitDateForUpdate(target.value)} />

          <div>
            <BsCheckLg onClick={async () => { await update(id); }} className="icon" />
            <BsXLg onClick={() => setUpdateField({ id: '', status: false })} className="icon" />
          </div>
        </div>
      );
    }
    return false;
  };

  return (
    <div className="tasks">

      <Select
        label="Ordenar por"
        options={orderOptions}
        testid="column-filter"
        value={orderValue}
        onChange={(e) => setOrderValue(e.target.value)}
      />

      {tasks.map(({ _id, task, limitDate }) => (
        <div className="edit-task">
          <div className="task">
            <div key={_id}>{task}</div>
            <div key={`${_id}date`}>{limitDate}</div>
            <div>
              <BsXLg onClick={async () => { await deleteTask(_id); }} className="icon" />
              <BsCheckLg onClick={async () => { await concludedTask(_id); }} className="icon" />
              <BsPencilFill
                className="icon"
                onClick={() => {
                  setUpdateField({ id: _id, status: true });
                  setTaskForUpdate(task);
                  setLimitDateForUpdate(limitDate);
                }}
              />
            </div>
          </div>
          {updateTask(_id)}
        </div>
      ))}
      <div className="new-task">
        <Input type="text" value={newTask} label="New Task" onChange={({ target }) => setNewTask(target.value)} />
        <Input type="date" value={newLimitDate} label="New Limit Date" onChange={({ target }) => setNewLimitDate(target.value)} />

        <BsPlusLg onClick={addTask} className="icon" />
      </div>
    </div>
  );
}
export default Tasks;
