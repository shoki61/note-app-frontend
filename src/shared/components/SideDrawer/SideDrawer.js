import React from 'react';


import Navigation from '../../Navigation/Navigation';
import Button from '../Button/Button';
import './SideDrawer.css';


const SideDrawer = props => {

    let attachedClasses = ['side-drawer' , 'Close'];
    if (props.open) {
        attachedClasses = ['side-drawer' , 'Open'];
    };

    return <div onClick={props.clicked} className={attachedClasses.join(' ')}>
            <Button className='side-drawer-close'><i className='fa fa-close'></i></Button>
            <Navigation sideDrawer/>
        </div>
};

export default SideDrawer;