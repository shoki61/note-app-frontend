import React from 'react';
import { NavLink } from 'react-router-dom';


import Image from '../../../../shared/components/Image/Image';
import Button from '../../../../shared/components/Button/Button';
import './PersonItem.css';

const PersonItem = props => {
    console.log(props)
    return <NavLink to={{pathname:'/profile', state: {id: props.id}}} onClick={props.closeModal} className='person-item-container'>
        <div style={{display:'flex'}}>
            <Image className='person-item-avatar mr-1' src={props.image} alt={props.name}/>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <p className='person-item-name'>{props.name}</p>
                <p className='person-item-job'>{props.job}</p>
            </div>
        </div>
        <Button className={'black-outline'}>Follow</Button>
    </NavLink>;
};


export default PersonItem;