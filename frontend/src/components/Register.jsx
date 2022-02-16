import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import api from '../api';
import UserContext from '../context/UserContext';
import '../styles/register-login.css';

function Register() {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { setUsername } = useContext(UserContext);

  const history = useHistory();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await api.post('/user', register);
      const response = await api.post('/login', { email: register.email, password: register.password });
      localStorage.setItem('authorization', response.data.token);
      setUsername(response.data.username);
      history.push('/profile');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="div-register">
      <h1>Register</h1>
      <form onSubmit={handleRegister} className="form">
        <Input
          label="Username"
          className="input"
          type="text"
          testid="username-input"
          value={register.username}
          onChange={({ target }) => {
            setRegister({ ...register, username: target.value });
          }}
        />
        <Input
          label="E-mail"
          className="input"
          type="email"
          testid="email-input"
          value={register.email}
          onChange={({ target }) => {
            setRegister({ ...register, email: target.value });
          }}
        />
        <Input
          label="Password"
          className="input"
          type="password"
          testid="password-input"
          value={register.password}
          onChange={({ target }) => {
            setRegister({ ...register, password: target.value });
          }}
        />
        <Button
          className="button-login-register"
          testid="register-submit-btn"
          label="Entrar"
        />
      </form>
    </div>
  );
}

export default Register;
