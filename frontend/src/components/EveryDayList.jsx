import React, { useEffect, useState } from 'react';
import {
  BsXLg, BsCheckLg, BsPlusLg, BsPencilFill,
} from 'react-icons/bs';
import api from '../api';
import Input from './Input';
import '../styles/every-day.css';
import Select from './Select';

function EveryDayList() {
  const [tasks, setEveryDayTask] = useState([]);
  const [newTask, setNewTask] = useState('');
  const orderOptions = ['', 'alphabetical'];
  const [orderValue, setOrderValue] = useState('');
  const authorization = localStorage.getItem('authorization');
  const [taskForUpdate, setTaskForUpdate] = useState('');
  const [updateField, setUpdateField] = useState({
    id: '',
    status: false,
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(async () => {
    let response = {};
    try {
      console.log('AQUI');
      response = await api.get(`/every-day/${orderValue}`, {
        headers: {
          authorization,
        },
      });
      if (response.data.length > 0) setEveryDayTask(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [refresh, orderValue]);

  const addEveryDayTask = async () => {
    let response;
    try {
      response = await api.post('/every-day', { task: newTask, checked: false }, {
        headers: {
          authorization,
        },
      });
      setEveryDayTask([...tasks, response.data]);
      setNewTask('');
      setRefresh((previousState) => !previousState);
    } catch (error) {
      if (error) alert(error.response.data.message);
    }
  };

  const deleteEveryDayTask = async (id) => {
    try {
      await api.delete(`/every-day/${id}`, {
        headers: {
          authorization,
        },
      });
      const newTasks = tasks.filter(({ _id }) => _id !== id);
      setEveryDayTask(newTasks);
      setRefresh((previousState) => !previousState);
    } catch (error) {
      if (error) alert(error.response.data.message);
    }
  };

  const update = async (id) => {
    try {
      await api.put(`/every-day/${id}`, { task: taskForUpdate }, {
        headers: {
          authorization,
        },
      });
      setUpdateField({ id: '', status: false });
      setTaskForUpdate('');
      setRefresh((previousState) => !previousState);
    } catch (error) {
      if (error) alert(error.response.data.message);
    }
  };

  const updateEveryDayTask = (id) => {
    if (updateField.status && updateField.id === id) {
      return (
        <div className="edit">
          <Input type="text" value={taskForUpdate} label="Edit task" onChange={({ target }) => setTaskForUpdate(target.value)} />

          <div>
            <BsCheckLg onClick={async () => { await update(id); }} className="icon" />
            <BsXLg onClick={() => setUpdateField({ id: '', status: false })} className="icon" />
          </div>
        </div>
      );
    }
    return false;
  };

  const handleChecked = async (id) => {
    try {
      await api.put(`/every-day/checked/${id}`, {}, {
        headers: {
          authorization,
        },
      });
    } catch (error) {
      if (error) alert(error.response.data.message);
    }
  };

  return (
    <div className="tasks-every-day">
      <h1>Every Day List</h1>
      <Select
        label="Ordenar por"
        options={orderOptions}
        testid="column-filter"
        value={orderValue}
        onChange={(e) => setOrderValue(e.target.value)}
      />

      {tasks.length === 0 ? <div className="noData">No tasks yet</div> : tasks.map(({ _id, task }) => (
        <div className="edit-task">
          <div className="task-every-day">
            <label className="label-checkbox" htmlFor={task}>
              <input
                type="checkbox"
                id={task}
                key={task}
                onClick={async () => { await handleChecked(_id); }}
                className="checkbox"
              />
              {task}
            </label>
            <div>
              <BsXLg onClick={async () => { await deleteEveryDayTask(_id); }} className="icon" key={`${_id}X`} />
              <BsPencilFill
                className="icon"
                onClick={() => {
                  setUpdateField({ id: _id, status: true });
                  setTaskForUpdate(task);
                }}
                key={`${_id}Pencil`}
              />
            </div>
          </div>
          {updateEveryDayTask(_id)}
        </div>
      ))}
      <div className="new-task">
        <div>
          <Input type="text" value={newTask} label="New task" onChange={({ target }) => setNewTask(target.value)} />
        </div>
        <BsPlusLg onClick={addEveryDayTask} className="icon" size="35px" />
      </div>
    </div>
  );
}
export default EveryDayList;
