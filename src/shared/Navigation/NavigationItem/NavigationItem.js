import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavigationItem.css';

const NavigationItem = props => {
    return (
        <li className='nav-item'>
            {props.slideDrawer && <i className={`fas fa-${props.icon} nav-icon`}></i>}
            <NavLink className='nav-item-link' exact={props.exact} to={{pathname: props.path, state:{id: props.userId}}}>
                {props.title}
            </NavLink>
        </li>
    )
};

export default NavigationItem;