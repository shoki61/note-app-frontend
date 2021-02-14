import React from 'react';


import Image from '../../../shared/components/Image/Image';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input'
import './Note.css';

const note = {
    id:1,
    title: 'This is my title',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    image:'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    creatorName:'Murat Artan',
    creatorImage: 'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    createdDate: '13.02.2021'
}

const Note = props => {
    return (
        <div className='note-container'>
            <div className='note-creator'>
                <div className='center'>
                    <div className='note-create-avatar'>
                        <Image src={note.creatorImage} alt={note.creatorName}/>
                    </div>
                    <p className='note-creator-name'>{note.creatorName} <span className='note-created-date'>{note.createdDate}</span></p>
                </div>
                <div style={{display:'flex'}}>
                    <Button className='info-outline'><i class="fa fa-comment-o"></i><span>4</span></Button>
                    <Button className='info-outline'><i className="fa fa-heart-o"></i><span>203</span></Button>
                    <Button className='info-outline'><i class="fa fa-bookmark-o"></i><span>118</span></Button>
                    <Button className='yellow-outline'>Update</Button>
                    <Button className='danger-outline'>Delete</Button>
                    <Button className='black-outline'>Follow</Button>
                </div>
            </div>
            <div className='note-content'>   
                <p className='note-title'>{note.title}</p>
                <div className='note-image'>
                    <Image src={note.image} alt={note.title}/>
                </div>
                <p className='note-description'>{note.description}</p>
            </div>
            <div className='line'></div>

            <div className='note-comment-container'>
                <p className='note-footer-title'>Add comment</p>
                <Input className='comment full' placeholder='write something...'/>
                <Button className='success'>Submit</Button>
            </div>

        </div>
    );
};

export default Note;