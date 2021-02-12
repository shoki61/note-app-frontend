import React from 'react';


import UserList from '../../components/UserList/UserList';
import './Users.css';

const DUMMY_DATA = [
  {
    id:1,
    name:'Murti',
    image:'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    notes:5
  },
  {
    id:2,
    name:'Shoki',
    image:'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    notes:3
  }
]

const Users = () => {
  return (
    <div className='center'>
      <UserList data={DUMMY_DATA}/>
    </div>
  );
};

export default Users;