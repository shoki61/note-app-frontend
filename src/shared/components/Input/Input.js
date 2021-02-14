import React from 'react';

import './Input.css';

const Input = props => {
    if(props.element === 'input'){
        return <input type={props.type} style={{...props.style}} placeholder={props.placeholder} className={`input ${props.className}`}/>
    };
    return <textarea style={{...props.style}} placeholder={props.placeholder} className={`input ${props.className}`}/>;
};

export default Input;