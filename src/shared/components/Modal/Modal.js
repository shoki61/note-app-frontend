import React from 'react';


import Button from '../Button/Button';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

const Modal = props => (
    <div className='modal'>
        <div className='modal-content'>
            <Button onClick={props.closeModal} className='modal-close-button'><i className='fa fa-close'></i></Button>
            {props.children}
        </div>
        <Backdrop onClose={props.closeModal} />
    </div>
);

export default Modal;