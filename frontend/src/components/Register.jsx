import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Button from './Button';
import Input from './Input';
import '../styles/Login.css';
import logo from '../images/logo.png';

function Login() {
  const [login, setLogin] = useState({
    username: '',
    email: '',
    password: '',
  }); // Criei um estado local, porque ainda não tem nada sobre estado global.

  const history = useHistory();
  // só jogando o hook useHistory em uma constante pra pegar o histórico

  /*   useEffect(() => {
    function handleValidation() { // valida o email e a senha
      const emailPath = /^[^\s@]+@[^\s@]+\.[^\s@]+$/g; // regex retirado de projetos anteriores.
      const MIN_LENGTH_PSSW = 6;
      if (emailPath.test(login.email) && login.password.length > MIN_LENGTH_PSSW) {
        setEnable((prevState) => !prevState);
      }
    }
    handleValidation();
  }, [login.email, login.password]); /// BUG */

  function handleButtonLogin() {
    history.push('/comidas'); // redirecionando pra página de comidas
  }

  return (
    <div className="Div-Inputs">
      <h1>Register</h1>
      <Input
        label="Username"
        className="inputLogin"
        type="text"
        testid="email-input"
        value={login.email}
        onChange={({ target }) => {
          setLogin({ ...login, email: target.value });
        }}
      />
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
        onClick={handleButtonLogin}
        label="Entrar"
      />
    </div>
  );
}

export default Login;
