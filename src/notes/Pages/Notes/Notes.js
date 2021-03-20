import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import NoteList from '../../components/NotesList/NotesList';
import './Notes.css';


const Notes = props => {
    const [ notes, setNotes ] = useState([]);

    useEffect(() => {
        const getNotes = async() => {
            const response = await fetch('http://localhost:5000/api/notes');
            const responseData = await response.json();
            let publicNotes;
            if(props.userRdcr.userInfo){
                publicNotes = responseData.notes.filter(item => item.creator === props.userRdcr.userInfo._id ? item : item.hidden === false);
            }else{
                publicNotes = responseData.notes.filter(item => item.hidden === false);
            };
            setNotes(publicNotes);
        };
        getNotes();
    }, []);

    return  <div className='notes-container'>
        <NoteList data={notes}/>
    </div>
};

const mapStateToProps = state => {
    return {
        userRdcr: state.userReducer
    };
};

export default connect(mapStateToProps)(Notes);