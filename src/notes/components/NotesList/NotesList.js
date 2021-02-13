import React from 'react';


import NoteItem from './NoteItem/NoteItem';
import './NotesList.css';

const NotesList = props => {
    return <div>
        {props.data.map(note => <NoteItem
            id={note.id}
            image={note.image}
            title={note.title}
            description={note.description}
            createdDate={note.createdDate}
        />)}
    </div>
};

export default NotesList;