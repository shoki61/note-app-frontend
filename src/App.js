import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Navigation from './shared/Navigation/Navigation';
import Spinner from './shared/components/Spinner/Spinner';
import './App.css';

const Users = React.lazy(() => import('./users/Pages/Users/Users'));
const Notes = React.lazy(() => import('./notes/Pages/Notes/Notes'));
const Note = React.lazy(() => import('./notes/Pages/Note/Note'));
const NewNote = React.lazy(() => import('./notes/Pages/NewNote/NewNote'));
const UpdateNote = React.lazy(() => import('./notes/Pages/UpdateNote/UpdateNote'));
const Profile = React.lazy(() => import('./users/Pages/Profile/Profile'));
const UpdateProfile = React.lazy(() => import('./users/Pages/UpdateProfile/UpdateProfile'));
const Auth = React.lazy(() => import('./users/Pages/Auth/Auth'));

const App = props => {
  return (
    <div>
      <BrowserRouter>
        <Navigation/>
        <Suspense fallback={<div className='center'><Spinner/></div>}>
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
        </Suspense>
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
