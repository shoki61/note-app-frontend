import React from 'react';

import Button from '../../../shared/components/Button/Button';
import CommentItem from './CommentItem/CommentItem';
import './NoteComments.css';


const NoteComments = props => {
    return (
        <div className='note-comments-container'>
            <Button onClick={props.onClose} className='note-comments-close'><i className='fa fa-close'></i></Button>
            <p className='note-comment-title'>Comments</p>
            {props.data.length ? props.data.map(comment => <CommentItem
                user={comment.user}
                key={comment._id}
                id={comment._id}
                userName={comment.name}
                date={comment.date}
                comment={comment.comment}
                userImage={comment.image}
            />): <p className='no-note-comment'>This note has no comments yet</p> }
        </div>
    );
};

export default NoteComments;