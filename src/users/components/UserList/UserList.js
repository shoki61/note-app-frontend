import React from 'react';


import UserItem from './UserItem/UserItem';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './UserList.css';

const UserList = props => {
    console.log(props.data)
    return(
        <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            {props.data.length ? props.data.map(user => <UserItem
                key={user._id}
                id={user._id}
                name={user.name}
                image={user.image}
                notes={user.notes.length}
             />):<Spinner/>}
        </div>
    );
};

export default UserList;