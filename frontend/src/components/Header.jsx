import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiLogOut } from 'react-icons/bi';
import UserContext from '../context/UserContext';
import logo from '../images/logo2.png';
import '../styles/header.css';

function Header() {
  const { username } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('authorization');
    history.push('/get-in');
  };

  return (
    <header className="header">

      <img src={logo} alt="logo" />

      <div className="username">{username}</div>

      <BiLogOut onClick={handleLogout} className="logout" size="60px" />

    </header>
  );
}
export default Header;
