import React from 'react';
import { NavLink } from 'react-router-dom';


import Image from '../../../../shared/components/Image/Image';
import Button from '../../../../shared/components/Button/Button';
import './PersonItem.css';

const PersonItem = props => {
    console.log(props.userInfo)
    return <NavLink to={{pathname:'/profile', state: {id: props.id}}} onClick={props.closeModal} className='person-item-container'>
        <div style={{display:'flex'}}>
            <div className='person-item-avatar mr-1'>
                {props.image
                    ? <Image src={props.image} alt={props.name}/>
                    : <div className='avatar-name font-20'><p>{props.name.charAt(0).toUpperCase()}</p></div>
                }
            </div>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <p className='person-item-name'>{props.name}</p>
                <p className='person-item-job'>{props.job}</p>
            </div>
        </div>
        {props.userInfo && props.userInfo._id !== props.id && 
            <Button 
                className={props.userInfo && props.userInfo.following.includes(props.id) ? 'black' : 'black-outline'}
            >
                {props.userInfo && props.userInfo.following.includes(props.id) ? 'Following' : 'Follow'}
            </Button>
        }
    </NavLink>;
};


export default PersonItem;