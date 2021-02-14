import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Navigation from './shared/Navigation/Navigation';
import Users from './users/Pages/Users/Users';
import Notes from './notes/Pages/Notes/Notes';
import Note from './notes/Pages/Note/Note';
import NewNote from './notes/Pages/NewNote/NewNote';
import Profile from './users/Pages/Profile/Profile';
import Auth from './users/Pages/Auth/Auth';
import './App.css';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        <Switch>
          <Route path='/users' exact>
            <Users/>
          </Route>
          <Route path='/notes'>
            <Notes/>
          </Route>
          <Route path='/note'>
            <Note/>
          </Route>
          <Route path='/profile'>
            <Profile/>
          </Route>
          <Route path='/auth'>
            <Auth/>
          </Route>
          <Route path='/new-note'>
            <NewNote/>
          </Route>
          <Redirect to='/users'/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
