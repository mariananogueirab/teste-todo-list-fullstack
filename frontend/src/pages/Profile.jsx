import React from 'react';
/* import Commitments from '../components/Commitments'; */
import Header from '../components/Header';
import Tasks from '../components/Tasks';
import '../styles/profile.css';

function Profile() {
  return (
    <div className="profile">
      <Header />
      <Tasks />
      {/* <Commitments /> */}
    </div>
  );
}
export default Profile;
