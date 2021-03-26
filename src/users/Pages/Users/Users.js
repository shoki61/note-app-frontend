import React, { useEffect, useState } from 'react';


import UserList from '../../components/UserList/UserList';
import Spinner from '../../../shared/components/Spinner/Spinner';
import backImg from '../../../assets/home.jfif';
import './Users.css';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [homeMessage, setHomeMessage] = useState('Welcome to "MYbLOG" site.');

  useEffect(() => {
    const getUsers = async() => {
      const response = await fetch('http://localhost:5000/api/users');
      const responseData = await response.json();
      setUsers(responseData.users)
    };
    getUsers();
  }, [])

  return (
    <div 
      style={{
        backgroundImage: `url('${backImg}')`,
        backgroundSize: 'cover', 
        backgroundRepeat:'no-repeat'
      }} 
      className='users-container'
    >
      <div className='linear-gradient'></div>
      <div style={{zIndex:200}} className='home-content'>
        <div style={{width:'50%'}}>
          <h1 className='home-text'>{homeMessage}</h1>
          <p className='home-description'>Freely share your own ideas, follow people and read their posts, like, mark for later reading and comment on posts.</p>
        </div>
        <div className='user-list-container'>
          <p className='user-list-title'>Recent posts</p>
          {users ? <UserList data={users}/> : <Spinner/>}
        </div>
      </div>
    </div>
  );
};


export default Users;