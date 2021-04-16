import React, { useEffect, useState } from 'react';


import UserItem from './UserItem/UserItem';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './UserList.css';

const UserList = props => {
    const [showBlur, setShowBlur] = useState(0);
    let scrollValue;

    const handleScroll = () => setShowBlur( scrollValue.scrollTop);

    useEffect(()=>{
        scrollValue = document.querySelector('.user-list')
        if (scrollValue) scrollValue.addEventListener('scroll',handleScroll)
    },[showBlur])

    let userList = <Spinner/>;
    if(props.data.length) userList = props.data.map(user => <UserItem
        key={user._id}
        id={user._id}
        name={user.name}
        image={user.image}
        notes={user.notes.length}
    />);

    return(
        <div className='user-list'>
            <div
                style={{background:'linear-gradient(transparent, black)', display: showBlur > 1 ? 'none' : 'block'}} 
                id='user-list-blur'>
            </div>
            {userList}
        </div>
    );
};

export default UserList;