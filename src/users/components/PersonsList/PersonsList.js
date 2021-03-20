import React from 'react';

import PersonItem from './PersonItem/PersonItem';
import './PersonsList.css';

const PersonList = props => {
    console.log(props.data)
    return <div style={{width:'85%'}}>
        {props.data.length 
            ? props.data.map(person => <PersonItem 
                follow={props.follow}
                userInfo={props.userInfo}
                key={person._id}
                name={person.name}
                job={person.job}
                image={person.image}
                id={person._id}
                closeModal={props.closeModal}
            />)
            : <p className='person-lists-message mt-2'>No users found</p>
        } 
    </div>;
};


export default PersonList;