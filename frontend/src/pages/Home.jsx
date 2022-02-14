import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import logo from '../images/logo.png';
import '../styles/home.css';

function Home() {
  const history = useHistory();

  return (
    <div className="div-home">
      <img src={logo} alt="ideas and commitments" data-testid="logo-photo" />
      <Button onClick={() => history.push('/get-in')} className="button-get-in" label="GET IN" />
    </div>
  );
}

export default Home;
