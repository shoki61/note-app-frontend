import React from 'react';
import { NavLink } from 'react-router-dom';


import Image from '../../../../shared/components/Image/Image';
import Card from '../../../../shared/components/Card/Card';
import './UserItem.css';

const UserItem = props => {
    return (
        <Card className='user-item-card'>
            <div className='user-item-container'>
                <NavLink to='/profile'>
                    <div className='user-item-content center'>
                        <div className='user-item-image'>
                            <Image src={props.image ? props.image : require('../../../image/defaultImg.png').default} alt={props.name}/>
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