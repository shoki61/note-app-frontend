import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import './Navigation.css';

const Navigation = () => {
  return(
    <header className='navigation box app-back-color'>
      <p className='app-name'>My notes</p>
      <nav>
        <ul className='center'>
          <NavigationItem
            title='Users'
            path='/users'
          />
          <NavigationItem
            title='Notes'
            path='/notes'
          />
          <NavigationItem
            title='Authentication'
            path='/auth'
          />
          <NavigationItem
            title='Profile'
            path='/profile'
          />
        </ul>
      </nav>
    </header>
  );  
};

export default Navigation;