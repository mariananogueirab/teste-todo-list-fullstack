import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Commitments from '../components/Commitments';
import EveryDayList from '../components/EveryDayList';
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import '../styles/profile.css';

function Profile() {
  const history = useHistory();
  const authorization = localStorage.getItem('authorization');

  useEffect(() => {
    if (!authorization) history.push('/get-in');
  }, [authorization]);

  return (
    <div className="profile">
      <Header />
      <Tasks />
      <div className="lists">
        <Commitments />
        <EveryDayList />
      </div>
    </div>
  );
}
export default Profile;
