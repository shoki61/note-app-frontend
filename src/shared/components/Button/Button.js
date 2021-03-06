import React from 'react';

import './Button.css';

const Button = props => {
    return (
        <button
            type={props.type}
            disabled={props.disabled}
            style={{...props.style}} 
            className={`button box ${props.className}`} 
            onClick={props.onClick}>{props.children}
        </button>
    )
};

export default Button;