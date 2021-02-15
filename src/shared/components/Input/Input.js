import React from 'react';

import './Input.css';

const Input = props => {
    if(props.element === 'input'){
        return  <input 
                    value={props.value}
                    type={props.type} 
                    style={{...props.style}} 
                    placeholder={props.placeholder} 
                    className={`input ${props.className}`}
                />
    };
    return  <textarea 
                value={props.value}
                style={{...props.style}} 
                placeholder={props.placeholder} 
                className={`input ${props.className}`}
            />;
};

export default Input;