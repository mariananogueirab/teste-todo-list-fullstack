import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles/get-in.css';

function GetIn() {
  return (
    <div className="div-get-in">
      <Register />
      <Login />
    </div>
  );
}
export default GetIn;
