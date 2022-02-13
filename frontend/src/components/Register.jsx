import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Button from './Button';
import Input from './Input';
import api from '../api';

function Register() {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
  });

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post('/user', register);
      await api.post('/login', { email: register.email, password: register.password });
      history.push('/profile');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="Div-Inputs">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <Input
          label="Username"
          className="inputLogin"
          type="text"
          testid="username-input"
          value={register.username}
          onChange={({ target }) => {
            setRegister({ ...register, username: target.value });
          }}
        />
        <Input
          label="E-mail"
          className="inputLogin"
          type="email"
          testid="email-input"
          value={register.email}
          onChange={({ target }) => {
            setRegister({ ...register, email: target.value });
          }}
        />
        <Input
          label="Password"
          className="inputLogin"
          type="password"
          testid="password-input"
          value={register.password}
          onChange={({ target }) => {
            setRegister({ ...register, password: target.value });
          }}
        />
        <Button
          className="Button-Entrar"
          testid="register-submit-btn"
          label="Entrar"
        />
      </form>
    </div>
  );
}

export default Register;
