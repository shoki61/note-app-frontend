import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './shared/Navigation/Navigation';
import Users from './users/Pages/Users/Users';
import Notes from './notes/Pages/Notes/Notes';
import Note from './notes/Pages/Note/Note';
import NewNote from './notes/Pages/NewNote/NewNote';
import UpdateNote from './notes/Pages/UpdateNote/UpdateNote';
import Profile from './users/Pages/Profile/Profile';
import UpdateProfile from './users/Pages/UpdateProfile/UpdateProfile';
import Auth from './users/Pages/Auth/Auth';
import './App.css';

const App = props => {

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
          <Route path='/note' render={props => <Note {...props}/>}/>
          <Route path='/profile' render={props => <Profile {...props}/>}/>
          <Route path='/auth'>
            <Auth/>
          </Route>
          <Route path={props.userInfo.isLoggedIn ? '/new-note': '/users'}>
            <NewNote/>
          </Route>
          <Route path={props.userInfo.isLoggedIn ? '/update-note': '/users'} render={props => <UpdateNote {...props}/>}/>
          <Route path={props.userInfo.isLoggedIn ? '/update-profile': '/users'} render={(props) => <UpdateProfile {...props}/>}/>
          <Redirect to='/users'/>
        </Switch>
      </BrowserRouter>
    </div>
  );
};


const mapStateToProps = state => {
  return {
    userInfo: state.userReducer
  };
};

export default connect(mapStateToProps)(App);
