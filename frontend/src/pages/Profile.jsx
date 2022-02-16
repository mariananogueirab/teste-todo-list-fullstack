import React from 'react';
import Commitments from '../components/Commitments';
import EveryDayList from '../components/EveryDayList';
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import '../styles/profile.css';

function Profile() {
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
