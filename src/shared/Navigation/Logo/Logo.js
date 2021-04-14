import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css';

const Logo = props => {
    return <Link to='/' className='logo center'>
        <div id='logo' style={{position:'relative'}} className='center logo-l'>
            <div id='logo-icon-back' className='logo-icon-back'>
            </div>
            <span className='logo-icon-text'>b</span>
        </div>
        <p id='logo-name' className='logo-name ml-1'>{props.name}</p>
    </Link>
}

export default Logo;