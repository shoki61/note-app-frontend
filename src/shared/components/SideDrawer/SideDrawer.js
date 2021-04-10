import React from 'react';


import Navigation from '../../Navigation/Navigation';
import Backdrop from '../Backdrop/Backdrop';
import './SideDrawer.css';


const SideDrawer = props => {

    let attachedClasses = ['side-drawer' , 'Close'];
    if (props.open) {
        attachedClasses = ['side-drawer' , 'Open'];
    };

    return <div onClick={props.clicked} className={attachedClasses.join(' ')}>
            <Navigation sideDrawer/>
        </div>
};

export default SideDrawer;