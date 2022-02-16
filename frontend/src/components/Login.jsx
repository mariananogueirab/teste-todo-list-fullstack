import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import Input from './Input';
import api from '../api';
import UserContext from '../context/UserContext';
import '../styles/register-login.css';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const { setUsername } = useContext(UserContext);

  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', login);

      localStorage.setItem('authorization', response.data.token);
      setUsername(response.data.username);
      history.push('/profile');
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="div-login">
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="form">
        <Input
          label="E-mail"
          className="input"
          type="email"
          testid="input-email"
          value={login.email}
          onChange={({ target }) => {
            setLogin({ ...login, email: target.value });
          }}
        />
        <Input
          label="Senha"
          className="input"
          type="password"
          testid="input-password"
          value={login.password}
          onChange={({ target }) => {
            setLogin({ ...login, password: target.value });
          }}
        />
        <Button
          className="button-login-register"
          testid="login-submit-btn"
          label="Entrar"
        />
      </form>
    </div>
  );
}

export default Login;
