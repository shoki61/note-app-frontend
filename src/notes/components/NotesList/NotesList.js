import React from 'react';


import NoteItem from './NoteItem/NoteItem';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './NotesList.css';

const NotesList = props => {

    let noteItem = <Spinner/>;
    console.log(props.data)
    if(props.data){
        noteItem = props.data.map(note => <NoteItem
            key={note._id}
            id={note._id}
            image={note.image}
            title={note.title}
            description={note.description}
            createdDate={note.createdAt}
        />);
    }else{
        noteItem = <p>Post Not Found</p>
    };
    return <div style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        {noteItem}
    </div>
};

export default NotesList;