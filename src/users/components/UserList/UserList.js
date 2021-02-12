import React from 'react';


import UserItem from './UserItem/UserItem'
import './UserList.css';

const UserList = props => {
    return(
        <div>
            {props.data.map(user => <UserItem
                id={user.id}
                name={user.name}
                image={user.image}
                notes={user.notes}
             />)}
        </div>
    );
};

export default UserList;