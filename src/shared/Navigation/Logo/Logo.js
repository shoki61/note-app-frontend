import React from 'react';

import './Logo.css';

const Logo = props => (
    <div className='logo center'>
        <div style={{width:props.size, height: props.size}} className='logo-icon center'>
            <div style={{borderRadius: props.size && 12}} className='logo-icon-back'>
            </div>
            <span className='logo-icon-text'>b</span>
        </div>
        <p style={{fontSize: props.size && 13, color: props.size ? '#fff' : '#ffa66b'}} className='logo-name ml-1'>{props.name}</p>
    </div>
);

export default Logo;