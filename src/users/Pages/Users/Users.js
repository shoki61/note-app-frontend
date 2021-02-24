import React, { useEffect, useState } from 'react';


import UserList from '../../components/UserList/UserList';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './Users.css';


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async() => {
      const response = await fetch('http://localhost:5000/api/users');
      const responseData = await response.json();
      setUsers(responseData.users)
    };
    getUsers();
  }, [])

  return (
    <div className='center users-container'>
      {users ? <UserList data={users}/> : <Spinner/>}
    </div>
  );
};


export default Users;