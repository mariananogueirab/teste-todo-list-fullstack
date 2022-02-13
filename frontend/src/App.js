import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import GetIn from './pages/GetIn';
import UserProvider from './context/User.Provider';
import Profile from './pages/Profile';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <UserProvider>
      <Routes>
        <Route exact path="/" component={Home} />
        <Route exact path="/get-in" component={GetIn} />
        <Route exact path="/profile" component={Profile} />
      </Routes>
    </UserProvider>
  );
}

export default App;
