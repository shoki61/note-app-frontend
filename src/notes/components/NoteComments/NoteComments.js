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
                id={comment.id}
                name={comment.name}
                date={comment.date}
                comment={comment.comment}
                avatar={comment.avatar}
            />): <p className='no-note-comment'>This note has no comments yet</p> }
        </div>
    );
};

export default NoteComments;