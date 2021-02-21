import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from '../../../../shared/components/Card/Card';
import Image from '../../../../shared/components/Image/Image';
import './NoteItem.css';

const NoteItem = props => {
    return(
        <Card className='note-item-card'>
            <div className='note-item-container'>
                <NavLink to='/note'>
                    <div className='note-item-content center'>
                        {props.image && <div className='note-item-image'>
                            <Image src={props.image} alt={props.title}/>
                        </div>}
                        <div style={{width:'70%', paddingRight:10, paddingLeft:25}}>
                            <div className='note-item-title-container center'>
                                <p className='note-item-title'>{props.title}</p>
                                <span className='note-item-date'>{props.createdDate}</span>
                            </div>
                            <p className='note-item-description'>{props.description}</p>
                        </div>
                    </div>
                </NavLink>
            </div>
        </Card>
    );
};

export default NoteItem;