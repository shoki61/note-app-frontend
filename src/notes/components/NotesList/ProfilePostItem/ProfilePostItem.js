import React from 'react';
import { NavLink } from 'react-router-dom';


import Image from '../../../../shared/components/Image/Image';
import './ProfilePostItem.css';

const ProfilePostItem = props => {
    return(
        <div className='profile-post-container'>
                <div className='profile-post-content'>
                    <p className='profile-post-title'>{props.title} Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                    <p className='profile-post-date mt-1 mb-1'><i className='fa fa-clock-o note-item-icon'></i> {new Date(props.createdDate).toLocaleString()}</p>
                    {props.image && <div className='profile-post-image mb-2'>
                        <Image src={`${process.env.REACT_APP_ASSETS_URL}/${props.image}`} alt={props.title}/>
                    </div>}
                    <p className='profile-post-description mb-1'>{props.description}</p>
                    <div className='profile-post-bottom center mt-2'>
                        <NavLink className='profile-post-detail-button' to={{pathname:'/note', state:{id:props.id}}}>
                            Read the full post
                        </NavLink>
                        <div className='profile-post-actions'>
                            <p className='profile-post-action'><i className='fa fa-heart-o profile-post-action-icon'></i>{props.likes.length}</p>
                            <p className='profile-post-action'><i className='fa fa-comment-o profile-post-action-icon'></i>{props.comments.length}</p>
                            <p className='profile-post-action'><i className='fa fa-bookmark-o profile-post-action-icon'></i>{props.markings.length}</p>
                        </div>
                    </div>
                </div>
        </div>
    );
};

export default ProfilePostItem;