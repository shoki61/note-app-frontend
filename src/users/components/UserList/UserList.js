import React from 'react';


import UserItem from './UserItem/UserItem'
import './UserList.css';

const UserList = props => {
    return(
        <div style={{width:'100%'}}>
            {props.data.map(user => <UserItem
                key={user.id}
                id={user.id}
                name={user.name}
                image={user.image}
                notes={user.notes}
             />)}
        </div>
    );
};

export default UserList;