import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import GetIn from './pages/GetIn';
import UserProvider from './context/UserProvider';
import Profile from './pages/Profile';

function App() {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <UserProvider>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/get-in" component={GetIn} />
        <Route exact path="/profile" component={Profile} />
      </Switch>
    </UserProvider>
  );
}

export default App;
