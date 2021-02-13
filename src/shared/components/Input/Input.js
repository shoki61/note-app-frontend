import React from 'react';

import './Input.css';

const Input = props => {
    if(props.element === 'input'){
        return <input placeholder={props.placeholder} className={`input ${props.className}`}/>
    };
    return <textarea placeholder={props.placeholder} className={`input ${props.className}`}/>;
};

export default Input;