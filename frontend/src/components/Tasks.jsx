import React, { useEffect, useState } from 'react';
import {
  BsXLg, BsCheckLg, BsPlusLg, BsPencilFill, BsFillLightningFill,
} from 'react-icons/bs';
import api from '../api';
import Input from './Input';
import '../styles/tasks.css';
import Select from './Select';

// estrela para prioridade BsFillStarFill
function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [newLimitDate, setNewLimitDate] = useState('');
  const orderOptions = ['', 'alphabetical', 'date', 'status'];
  const [orderValue, setOrderValue] = useState('');
  const authorization = localStorage.getItem('authorization');
  const [taskForUpdate, setTaskForUpdate] = useState('');
  const [limitDateForUpdate, setLimitDateForUpdate] = useState('');
  const [updateField, setUpdateField] = useState({
    id: '',
    status: false,
  });
  const [refresh, setRefresh] = useState(false);

  useEffect(async () => {
    let response = {};
    try {
      console.log('AQUI');
      response = await api.get(`/tasks/${orderValue}`, {
        headers: {
          authorization,
        },
      });
      if (response.data.length > 0) setTasks(response.data);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }, [refresh, orderValue]);

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
      setRefresh((previousState) => !previousState);
    } catch (error) {
      if (error) alert(error.response.data.message);
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
      setRefresh((previousState) => !previousState);
    } catch (error) {
      if (error) alert(error.response.data.message);
    }
  };

  const statusTaskCompleted = async (id) => {
    try {
      await api.put(`/tasks/status/${id}`, { status: 'completed' }, {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      });
      setRefresh((previousState) => !previousState);
    } catch (error) {
      if (error) alert(error.response.data.message);
    }
  };

  const statusTaskInProgress = async (id) => {
    try {
      await api.put(`/tasks/status/${id}`, { status: 'in-progress' }, {
        headers: {
          authorization: localStorage.getItem('authorization'),
        },
      });
      setRefresh((previousState) => !previousState);
    } catch (error) {
      if (error) alert(error.response.data.message);
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
      setRefresh((previousState) => !previousState);
    } catch (error) {
      if (error) alert(error.response.data.message);
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
      <h1>Tasks</h1>
      <Select
        label="Ordenar por"
        options={orderOptions}
        testid="column-filter"
        value={orderValue}
        onChange={(e) => setOrderValue(e.target.value)}
      />

      {tasks.length === 0 ? <div className="noData">No tasks yet</div> : tasks.map(({
        _id, task, limitDate, status,
      }) => (
        <div className="edit-task">
          <div className={`task ${status}`}>
            <div key={_id}>{task}</div>
            <div key={`${_id}date`}>{limitDate}</div>
            <div>
              <BsXLg onClick={async () => { await deleteTask(_id); }} className="icon" key={`${_id}X`} />
              <BsCheckLg
                onClick={async () => {
                  await statusTaskCompleted(_id);
                }}
                className="icon"
                key={`${_id}check`}
              />
              <BsPencilFill
                className="icon"
                onClick={() => {
                  setUpdateField({ id: _id, status: true });
                  setTaskForUpdate(task);
                  setLimitDateForUpdate(limitDate);
                }}
                key={`${_id}pencil`}
              />
              <BsFillLightningFill
                className="icon"
                onClick={async () => {
                  await statusTaskInProgress(_id);
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

        <BsPlusLg onClick={addTask} className="icon" size="35px" />
      </div>
    </div>
  );
}
export default Tasks;
