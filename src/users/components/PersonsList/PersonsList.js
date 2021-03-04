import React from 'react';

import PersonItem from './PersonItem/PersonItem';
import './PersonsList.css';

const PersonList = props => {
    return <div>
        {props.data.map(person => <PersonItem 
            name={person.name}
            job={person.job}
            image={person.image}
        />)}
    </div>;
};


export default PersonList();