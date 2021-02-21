import React from 'react';


import NoteItem from './NoteItem/NoteItem';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './NotesList.css';

const NotesList = props => {

    let noteItem = <Spinner/>;
    
    if(props.data){
        noteItem = props.data.map(note => <NoteItem
            id={note._id}
            image={note.image}
            title={note.title}
            description={note.description}
            createdDate={note.createdAt}
        />);
    };
    return <div>
        {noteItem}
    </div>
};

export default NotesList;