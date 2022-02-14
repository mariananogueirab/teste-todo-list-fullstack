import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import logo from '../images/logo2.png';
import '../styles/header.css';

function Header() {
  const { username } = useContext(UserContext);

  return (
    <header className="header">

      <img src={logo} alt="logo" />

      <div className="username">{username}</div>
    </header>
  );
}
export default Header;
