import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navigation from './shared/Navigation/Navigation';
import Users from './users/Pages/Users/Users';
import './App.css';

const App = () => {

  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        <Route path='/' exact>
          <Users/>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
