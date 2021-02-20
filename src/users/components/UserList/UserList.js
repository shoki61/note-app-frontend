import React from 'react';


import UserItem from './UserItem/UserItem';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './UserList.css';

const UserList = props => {
    let userList = <Spinner/>;
    if(props.data.length) userList = props.data.map(user => <UserItem
        key={user._id}
        id={user._id}
        name={user.name}
        image={user.image}
        notes={user.notes.length}
     />);
    else setTimeout(() => userList = <p className='not-found-text'>There isn't any users</p>, 2000);
    return(
        <div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            {userList}
        </div>
    );
};

export default UserList;