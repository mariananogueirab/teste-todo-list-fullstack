import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  BsXLg, BsCheckLg, BsPlusLg, BsPencilFill,
} from 'react-icons/bs';
import api from '../api';
import Input from './Input';
import '../styles/commitments.css';
import Select from './Select';

function Commitments() {
  const [commitments, setCommitments] = useState([]);
  const [newCommitment, setNewCommitment] = useState('');
  const [newDate, setNewDate] = useState('');
  const orderOptions = ['', 'date'];
  const [orderValue, setOrderValue] = useState('');
  const history = useHistory();
  const authorization = localStorage.getItem('authorization');
  const [commitmentForUpdate, setCommitmentForUpdate] = useState('');
  const [dateForUpdate, setDateForUpdate] = useState('');
  const [updateField, setUpdateField] = useState({
    id: '',
    status: false,
  });

  useEffect(async () => {
    if (!authorization) history.push('/get-in');
    try {
      const response = await api.get(`/commitments/${orderValue}`, {
        headers: {
          authorization,
        },
      });
      setCommitments(response.data);
    } catch (error) {
      console.log(error);
    }
  }, [newCommitment, orderValue, updateField]);

  const addCommitment = async () => {
    let response;
    try {
      response = await api.post('/commitments', { commitment: newCommitment, date: newDate }, {
        headers: {
          authorization,
        },
      });
      setCommitments([...commitments, response.data]);
      setNewCommitment('');
      setNewDate('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const deleteCommitment = async (id) => {
    try {
      await api.delete(`/commitments/${id}`, {
        headers: {
          authorization,
        },
      });
      const newCommitments = commitments.filter(({ _id }) => _id !== id);
      setCommitments(newCommitments);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const update = async (id) => {
    try {
      await api.put(`/commitments/${id}`, { commitment: commitmentForUpdate, date: dateForUpdate }, {
        headers: {
          authorization,
        },
      });
      setUpdateField({ id: '', status: false });
      setCommitmentForUpdate('');
      setDateForUpdate('');
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const updateCommitment = (id) => {
    if (updateField.status && updateField.id === id) {
      return (
        <div className="edit">
          <Input type="text" value={commitmentForUpdate} label="Edit commitment" onChange={({ target }) => setCommitmentForUpdate(target.value)} />
          <Input type="date" value={dateForUpdate} label="Edit Date" onChange={({ target }) => setDateForUpdate(target.value)} />

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
    <div className="commitments">
      <h1>Commitments</h1>
      <Select
        label="Ordenar por"
        options={orderOptions}
        testid="column-filter"
        value={orderValue}
        onChange={(e) => setOrderValue(e.target.value)}
      />

      {commitments.map(({ _id, commitment, date }) => (
        <div className="edit-commitment">
          <div className="commitment">
            <div key={_id}>{commitment}</div>
            <div key={`${_id}date`}>{date}</div>
            <div>
              <BsXLg onClick={async () => { await deleteCommitment(_id); }} className="icon" />
              <BsPencilFill
                className="icon"
                onClick={() => {
                  setUpdateField({ id: _id, status: true });
                  setCommitmentForUpdate(commitment);
                  setDateForUpdate(date);
                }}
              />
            </div>
          </div>
          {updateCommitment(_id)}
        </div>
      ))}
      <div className="new-commitment">
        <div>
          <Input type="text" value={newCommitment} label="New commitment" onChange={({ target }) => setNewCommitment(target.value)} />
          <Input type="date" value={newDate} label="New Date" onChange={({ target }) => setNewDate(target.value)} />
        </div>
        <BsPlusLg onClick={addCommitment} className="icon" />
      </div>
    </div>
  );
}
export default Commitments;
