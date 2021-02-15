import React from 'react';

import Button from '../../../shared/components/Button/Button';
import CommentItem from './CommentItem/CommentItem';
import './NoteComments.css';

const DUMMY_DATA = [
    {
        id:1,
        name:'Murat Artan',
        date:'15.02.2021',
        comment:'A nice sharing, health to your hands',
        avatar:'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        id:2,
        name:'Sohrat Jumadurdyyev',
        date:'18.02.2021',
        comment:'I agree I found it really helpful. Thank you',
        avatar:'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
]

const NoteComments = props => {
    return (
        <div className='note-comments-container'>
            <Button onClick={props.onClose} className='note-comments-close'><i className='fa fa-close'></i></Button>
            <p className='note-comment-title'>Comments</p>
            { DUMMY_DATA.map(comment => <CommentItem
                id={comment.id}
                name={comment.name}
                date={comment.date}
                comment={comment.comment}
                avatar={comment.avatar}
            />) }
        </div>
    );
};

export default NoteComments;