import React from 'react';
import { NavLink } from 'react-router-dom';

import Card from '../../../../shared/components/Card/Card';
import Image from '../../../../shared/components/Image/Image';
import './NoteItem.css';

const NoteItem = props => {
    return(
        <Card className='note-item-card'>
            <div className='note-item-container'>
                <NavLink to='/noteDetail'>
                    <div className='note-item-content center'>
                        <div className='note-item-image'>
                            <Image src={props.image} alt={props.title}/>
                        </div>
                        <div style={{width:'70%', paddingRight:10}}>
                            <div className='center'>
                                <p className='note-item-title'>{props.title} sdfkja kljdaf nkjfd adfgj fdgk algfdg adgkj dfg sdfgakjlfglf afdg fd </p>
                                <span className='note-item-date'>{props.createdDate}</span>
                            </div>
                            <p className='note-item-description'>{props.description} safsdfsdafsdfsdfasdfdsfmnbmnnv kanv nfkn kjnkg nkj nfdakj nk nk lkagjlk nkf nkjnv kjnkjnv kjnv kjvnkdfjvn kjnv kjdnfkj ndkvj nfdskjkjnvkj nkjn kj nkj njk nkjn kjnvk n kjnv jd kjn kjdfn vadfkjnvkjfdnv kjdnkdjfnv kjdfnvkdfnv vkjnkjd nkvjdf nvkdfvnkdfjvnkdfjnvkjdfnv dkjfn vkjdfnv kjdf nkdjf nvdkjfn vkdjfnv</p>
                        </div>
                    </div>
                </NavLink>
            </div>
        </Card>
    );
};

export default NoteItem;