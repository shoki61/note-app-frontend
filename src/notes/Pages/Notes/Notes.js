import React, { useEffect, useState } from 'react';


import NoteList from '../../components/NotesList/NotesList';
import './Notes.css';


const Notes = props => {
    const [ notes, setNotes ] = useState([]);

    useEffect(() => {
        const getNotes = async() => {
            const response = await fetch('http://localhost:5000/api/notes');
            const responseData = await response.json();
            setNotes(responseData.notes);
        };
        getNotes();
    }, []);

    return  <div className='notes-container'>
        <NoteList data={notes}/>
    </div>
};

export default Notes;