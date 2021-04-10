import React, { Suspense, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';

import Navigation from './shared/Navigation/Navigation';
import Spinner from './shared/components/Spinner/Spinner';
import Button from './shared/components/Button/Button';
import SideDrawer from './shared/components/SideDrawer/SideDrawer';
import Backdrop from './shared/components/Backdrop/Backdrop';
import './App.css';

const Home = React.lazy(() => import('./shared/Pages/Home/Home'));
const Users = React.lazy(() => import('./users/Pages/Users/Users'));
const Notes = React.lazy(() => import('./notes/Pages/Notes/Notes'));
const Note = React.lazy(() => import('./notes/Pages/Note/Note'));
const NewNote = React.lazy(() => import('./notes/Pages/NewNote/NewNote'));
const UpdateNote = React.lazy(() => import('./notes/Pages/UpdateNote/UpdateNote'));
const Profile = React.lazy(() => import('./users/Pages/Profile/Profile'));
const UpdateProfile = React.lazy(() => import('./users/Pages/UpdateProfile/UpdateProfile'));
const Auth = React.lazy(() => import('./users/Pages/Auth/Auth'));
const Page404 = React.lazy(() => import('./shared/Pages/Page404/Page404'));

const App = props => {

  const [ open, setOpen ] = useState(true);

  const sideDrawerHandler = () => setOpen(!open);

  return (
      <BrowserRouter>
        <Navigation/>
        <Suspense fallback={<div className='center'><Spinner/></div>}>
          <Switch>
            <Route path='/users' >
              <Users/>
            </Route>
            <Route path='/notes' >
              <Notes/>
            </Route>
            <Route path='/note' render={props => <Note {...props}/>} />
            <Route path='/profile' render={props => <Profile {...props}/>} />
            <Route path='/auth' >
              <Auth/>
            </Route>
            <Route path={props.userInfo.isLoggedIn ? '/new-note': '/users'} >
              <NewNote/>
            </Route>
            <Route path={props.userInfo.isLoggedIn ? '/update-note': '/users'} render={props => <UpdateNote {...props}/>} />
            <Route path={props.userInfo.isLoggedIn ? '/update-profile': '/users'} render={(props) => <UpdateProfile {...props}/>} />
            <Route path='/' exact>
              <Home/>
            </Route>
            <Route path='/404'>
              <Page404/>
            </Route>
            <Redirect to='/404'/>
          </Switch>
        </Suspense>
        {open && <Backdrop onClose={sideDrawerHandler}/>}
        <SideDrawer clicked={sideDrawerHandler} open={open}/>
        {props.userInfo.isLoggedIn && <Link to='/new-note'><Button className='new-post-button'><i className='fas fa-feather-alt'></i></Button></Link>}
      </BrowserRouter>
  );
};


const mapStateToProps = state => {
  return {
    userInfo: state.userReducer
  };
};

export default connect(mapStateToProps)(App);
