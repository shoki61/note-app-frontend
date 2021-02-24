import React from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../components/Button/Button';
import * as actions from '../../store/actions/index';
import './Navigation.css';

const Navigation = props => {
  return(
    <header className='navigation box app-back-color'>
      <p className='app-name'>My block</p>
      <nav>
        <ul className='center'>
          <NavigationItem
            title='Users'
            path='/users'
          />
          <NavigationItem
            title='Posts'
            path='/notes'
          />
          {
            props.userInfo.isLoggedIn && <NavigationItem
            title='Profile'
            path='/profile'
            userId={props.userInfo.userId}
          />
          }
          {
            !props.userInfo.isLoggedIn && <NavigationItem
            title='Login'
            path='/auth'
          />
          }
          {
            props.userInfo.isLoggedIn && <Button className='nav-auth-button' onClick={props.onLogout}>
              Logout
          </Button>
          }
        </ul>
      </nav>
    </header>
  );  
};


const mapStateToProps = state => {
  return {
    userInfo: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.authLogout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);