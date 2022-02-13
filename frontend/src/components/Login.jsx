import React, { useContext, useState } from 'react';
/* import { useHistory } from 'react-router-dom'; */
import Button from './Button';
import Input from './Input';
import api from '../api';
import UserContext from '../context/UserContext';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const { setUsername } = useContext(UserContext);

  /* const history = useHistory(); */

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', login);
      localStorage.setItem('authorization', response.data.token);
      setUsername(response.data.username);
    } catch (error) {
      alert(error);
    }

    /* history.push('/profile'); */
  };

  return (
    <div className="Div-Inputs">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <Input
          label="E-mail"
          className="inputLogin"
          type="email"
          testid="email-input"
          value={login.email}
          onChange={({ target }) => {
            setLogin({ ...login, email: target.value });
          }}
        />
        <Input
          label="Senha"
          className="inputLogin"
          type="password"
          testid="password-input"
          value={login.password}
          onChange={({ target }) => {
            setLogin({ ...login, password: target.value });
          }}
        />
        <Button
          className="Button-Entrar"
          testid="login-submit-btn"
          label="Entrar"
        />
      </form>
    </div>
  );
}

export default Login;
