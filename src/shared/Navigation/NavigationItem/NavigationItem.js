import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const NavigationItem = props => {
    return (
        <li className='nav-item'>
            <NavLink to={{pathname: props.path, state:{id: props.userId}}}>
                {props.title}
            </NavLink>
        </li>
    )
};

export default NavigationItem;