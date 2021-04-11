import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../components/Button/Button';
import Logo from './Logo/Logo';
import * as actions from '../../store/actions/index';
import './Navigation.css';

const Navigation = props => {
  const { userInfo, isLoggedIn } = props.userRdcr;
  const [shrink, setShrink] = useState(' ');
  const [logoSize, setLogoSize] = useState();

  window.onscroll = function() {scrollFunction()};

const scrollFunction = () => {
  if (document.documentElement.scrollTop > 30) {
    setShrink('shrink');
    setLogoSize(30)
  } else {
    setShrink(' ');
    setLogoSize()
  };
};
  return(
    <header className={`navigation ${shrink}`}>
      {!props.sideDrawer &&<Logo size={logoSize} name='MY BLOG'/>}
      <nav className='header-nav'>
        <ul className={!props.sideDrawer && 'center'}>
        <NavigationItem
            slideDrawer={props.sideDrawer}
            icon='home'
            title='Home'
            path='/'
            exact
          />
          <NavigationItem
            slideDrawer={props.sideDrawer}
            icon='user-friends'
            title='Users'
            path='/users'
          />
          <NavigationItem
            slideDrawer={props.sideDrawer}
            icon='feather-alt'
            title='Posts'
            path='/notes'
          />
          {
            isLoggedIn && <NavigationItem
            slideDrawer={props.sideDrawer}
            icon='user'
            title='Profile'
            path='/profile'
            userId={userInfo ? userInfo._id : null}
          />
          }
          {
            !isLoggedIn && <NavigationItem
            slideDrawer={props.sideDrawer}
            icon='sign-in-alt'
            title='Login'
            path='/auth'
          />
          }
          {
            isLoggedIn && <Button className='nav-auth-button' onClick={props.onLogout}>
              Logout
          </Button>
          }
        </ul>
      </nav>
      <div className='header-menu-button' onClick={props.clicked}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );  
};


const mapStateToProps = state => {
  return {
    userRdcr: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);