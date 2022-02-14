import React from 'react';
import Commitments from '../components/Commitments';
import Header from '../components/Header';
import Tasks from '../components/Tasks';

function Profile() {
  return (
    <div>
      <Header />
      <Tasks />
      <Commitments />
    </div>
  );
}
export default Profile;
