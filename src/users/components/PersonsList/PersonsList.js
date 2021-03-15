import React from 'react';

import PersonItem from './PersonItem/PersonItem';
import './PersonsList.css';

const DUMMY_DATA = [
    {
        image: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        name: 'Murat Artan',
        job: 'Developer',
    }
]

const PersonList = props => {
    return <div>
        {DUMMY_DATA.map(person => <PersonItem 
            name={person.name}
            job={person.job}
            image={person.image}
        />)} 
    </div>;
};


export default PersonList;