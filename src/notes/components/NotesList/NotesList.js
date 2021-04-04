import React from 'react';


import NoteItem from './NoteItem/NoteItem';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './NotesList.css';

const NotesList = props => {

    let noteItem = <Spinner/>;
    if(props.data){
        noteItem = props.data.map(note => <NoteItem
            key={note._id}
            id={note._id}
            image={note.image}
            title={note.title}
            creator={note.creator}
            description={note.description}
            createdDate={note.updatedAt}
        />);
    }else{
        noteItem = <p>Post Not Found</p>
    };
    return <div>
        {noteItem}
    </div>
};
export default NotesList;