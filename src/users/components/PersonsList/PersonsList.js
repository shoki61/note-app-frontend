import React from 'react';

import PersonItem from './PersonItem/PersonItem';
import './PersonsList.css';

const PersonList = props => {
    return <div style={{width:'85%'}}>
        {props.data.map(person => <PersonItem 
            follow={props.follow}
            userInfo={props.userInfo}
            key={person._id}
            name={person.name}
            job={person.job}
            image={person.image}
            id={person._id}
            closeModal={props.closeModal}
        />)} 
    </div>;
};


export default PersonList;