import React from 'react';


import './PersonItem.css';

const PersonItem = props => {
    return <div>
        {JSON.stringify(props)}
    </div>;
};


export default PersonItem();