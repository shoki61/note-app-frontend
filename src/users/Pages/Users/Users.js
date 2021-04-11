import React, { useEffect, useState } from 'react';


import UserList from '../../components/UserList/UserList';
import Spinner from '../../../shared/components/Spinner/Spinner';
import backImg from '../../../assets/home.jfif';
import './Users.css';


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async() => {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users`);
      const responseData = await response.json();
      setUsers(responseData.users)
    };
    getUsers();
  }, [])

  return (
    <div className='users-container' >
      <div className='linear-gradient'></div>
      <div style={{zIndex:200}} className='home-content'>
        <div className='home-left-text'>
          <h1 className='home-text'>Welcome to "MY BLOG" site.</h1>
          <p className='home-description'>Freely share your own ideas, follow people and read their posts, like, mark for later reading and comment on posts.</p>
        </div>
        <div className='user-list-container'>
          <p className='user-list-title mb-1'>Users</p>
          {users ? <UserList data={users}/> : <Spinner/>}
        </div>
      </div>
    </div>
  );
};


export default Users;