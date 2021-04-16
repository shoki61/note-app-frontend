import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import NoteList from '../../components/NotesList/NotesList';
import './Notes.css';


const Notes = props => {
    const [ notes, setNotes ] = useState([]);
    document.title = 'Posts';
    useEffect(() => {
        const getNotes = async() => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes`);
            const responseData = await response.json();
            let publicNotes;
            if(responseData.notes){
                publicNotes = responseData.notes.filter(item => item.hidden === false);
            }
            setNotes(publicNotes);
        };
        getNotes();
    }, []);

    return  <div className='notes-container'>
        <NoteList type={props.type} data={notes}/>
    </div>
};

const mapStateToProps = state => {
    return {
        userRdcr: state.userReducer
    };
};

export default connect(mapStateToProps)(Notes);