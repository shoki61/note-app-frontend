import React from 'react';
import { NavLink } from 'react-router-dom';


import Image from '../../../../shared/components/Image/Image';
import Button from '../../../../shared/components/Button/Button';
import './PersonItem.css';

const PersonItem = props => {
    console.log(props.name)
    return <div className='person-item-container'>
        <NavLink to={{pathname:'/profile', state: {id: props.id}}} style={{display:'flex', width: '100%'}} onClick={props.closeModal}>
            <div className='person-item-avatar mr-1'>
                {props.image
                    ? <Image src={`http://localhost:5000/${props.image}`} alt={props.name}/>
                    : <div className='avatar-name font-20'><p>{props.name.charAt(0).toUpperCase()}</p></div>
                }
            </div>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <p className='person-item-name'>{props.name}</p>
                <p className='person-item-job'>{props.job}</p>
            </div>
        </NavLink>
        {props.userInfo && props.userInfo._id !== props.id && 
            <Button 
                onClick={() => props.follow(props.id)}
                className={props.userInfo && props.userInfo.following.find(item => item._id === props.id) ? 'black' : 'black-outline'}
            >
                {props.userInfo && props.userInfo.following.find(item => item._id === props.id) ? 'Following' : 'Follow'}
            </Button>
        }
    </div>;
};


export default PersonItem;