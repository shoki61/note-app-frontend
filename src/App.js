import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navigation from './shared/Navigation/Navigation';
import Users from './users/Pages/Users/Users';
import Notes from './notes/Pages/Notes/Notes';
import Note from './notes/Pages/Note/Note';
import './App.css';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        <Route path='/users' exact>
          <Users/>
        </Route>
        <Route path='/notes' exact>
          <Notes/>
        </Route>
        <Route path='/note' exact>
          <Note/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
