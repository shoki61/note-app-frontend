import React, { useEffect, useState } from 'react';


import NoteList from '../../components/NotesList/NotesList';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './Notes.css';


const Notes = props => {
    const [ notes, setNotes ] = useState();

    useEffect(() => {
        const getNotes = async() => {
            const response = await fetch('http://localhost:5000/api/notes');
            const responseData = await response.json();
            setNotes(responseData.notes);
        };
        getNotes();
    }, []);

    let noteList = <Spinner/>;

    if(notes) noteList = <NoteList data={notes}/>;
    else noteList = <p className='notes-not-found-text'>There isn't any notes</p>;

    return  <div className='notes-container center'>
        {noteList}
    </div>
};

export default Notes;