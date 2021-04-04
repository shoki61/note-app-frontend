import React from 'react';
import { NavLink } from 'react-router-dom';

import Image from '../../../../shared/components/Image/Image';
import './NoteItem.css';

const NoteItem = props => {
    return(
        <div  className='note-item-container'>
            <NavLink to={{pathname:'/note', state:{id:props.id}}}>
                <div className='note-item-content center'>
                    <div style={{width: props.image ? '65%' : '100%'}}>
                        <NavLink to={{pathname:'/profile', state:{id:props.creator._id}}} className='note-item-creator-container center'>
                            <div className='note-item-creator-img mr-1'>
                                <Image src={`${process.env.REACT_APP_ASSETS_URL}/${props.creator.image}`} alt={props.creator.name}/>
                            </div>
                            <p className='note-item-creator-name'>{props.creator.name}</p>
                        </NavLink>
                        <p className='note-item-title'>{props.title} Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                        <p className='note-item-description'>{props.description}</p>
                        <p className='note-item-date'><i className='fa fa-clock-o note-item-icon'></i> {new Date(props.createdDate).toLocaleString()}</p>
                    </div>
                    {props.image && <div className='note-item-image ml-1'>
                        <Image src={`${process.env.REACT_APP_ASSETS_URL}/${props.image}`} alt={props.title}/>
                    </div>}
                </div>
            </NavLink>
        </div>
    );
};

export default NoteItem;