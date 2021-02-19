import React, { useEffect, useState } from 'react';


import UserList from '../../components/UserList/UserList';
import './Users.css';


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let responseData;
    const getUsers = async() => {
      const response = await fetch('http://localhost:5000/api/users');
      responseData = await response.json();
      setUsers(responseData.users)
    };
    getUsers();
  }, [])

  return (
    <div className='center users-container'>
      <UserList data={users}/>
    </div>
  );
};


export default Users;