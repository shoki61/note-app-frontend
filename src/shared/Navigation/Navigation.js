import React from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';
import Button from '../components/Button/Button';
import Image from '../components/Image/Image';
import Logo from '../../assets/logo.png';
import * as actions from '../../store/actions/index';
import './Navigation.css';

const Navigation = props => {
  const { userInfo, isLoggedIn } = props.userRdcr;
  
  return(
    <header className='navigation box'>
      <Image className='logo' src={Logo}/>
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
            isLoggedIn && <NavigationItem
            title='Profile'
            path='/profile'
            userId={userInfo ? userInfo._id : null}
          />
          }
          {
            !isLoggedIn && <NavigationItem
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