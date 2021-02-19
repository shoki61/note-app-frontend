import React from 'react';


import UserItem from './UserItem/UserItem'
import './UserList.css';

const UserList = props => {
    console.log(props.data)
    return(
        <div style={{width:'100%'}}>
            {props.data.length ? props.data.map(user => <UserItem
                key={user._id}
                id={user._id}
                name={user.name}
                image={user.image}
                notes={user.notes.length}
             />):<p>Loading...</p>}
        </div>
    );
};

export default UserList;