import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../components/Button/Button';
import Logo from './Logo/Logo';
import * as actions from '../../store/actions/index';
import './Navigation.css';

const Navigation = props => {
  const history = useHistory();
  const { userInfo, isLoggedIn } = props.userRdcr;

  window.onscroll = function() {scrollFunction()};

  const scrollFunction = () => {
    if (document.documentElement.scrollTop > 30 || document.body.scrollTop > 30) {
      document.getElementById('header').className = 'navigation shrink';
      document.getElementById('logo').className = 'center logo-s';
      document.getElementById('logo-icon-back').style.borderRadius = '12px';
      document.getElementById('logo-name').style = 'color:#fff; font-size: 15px';
    } else {
      document.getElementById('header').className = 'navigation';
      document.getElementById('logo').className = 'center logo-l';
      document.getElementById('logo-icon-back').style.borderRadius = '17px';
      document.getElementById('logo-name').style = 'color:#ffa66b; font-size: 20px';
    };
  };

  const logout = () => {
    props.onLogout();
    history.push('/')
  }
  return(
    <header id='header' className='navigation'>
      {!props.sideDrawer &&<Logo name='MY BLOG'/>}
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
            isLoggedIn && <Button className='nav-auth-button' onClick={logout}>
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