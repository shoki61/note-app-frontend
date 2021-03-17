import React from 'react';
import { NavLink } from 'react-router-dom';


import Image from '../../../../shared/components/Image/Image';
import Card from '../../../../shared/components/Card/Card';
import './UserItem.css';

const UserItem = props => {
    return (
        <Card className='user-item-card'>
            <div className='user-item-container'>
                <NavLink to={{pathname:'/profile', state: {id: props.id}}}>
                    <div className='user-item-content center'>
                        <div className='user-item-image'>
                            {props.image 
                                ? <Image src={props.image} alt={props.name}/> 
                                : <p className='user-avatar-name'>{props.name}</p>
                            }
                        </div>
                        <div>
                            <p className='user-item-name'>{props.name}</p>
                            <p className='user-item-notes'>Notes: {props.notes}</p>
                        </div>
                    </div>
                </NavLink>
            </div>
        </Card>
    );
};

export default UserItem;