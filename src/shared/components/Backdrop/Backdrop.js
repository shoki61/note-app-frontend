import React from 'react';


import './Backdrop.css';

const Backdrop = props => <div onClick={props.onClose} className='backdrop'></div>;

export default Backdrop;