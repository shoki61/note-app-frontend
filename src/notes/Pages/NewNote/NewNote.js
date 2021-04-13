import React from 'react';


import NoteTaker from '../../components/NoteTaker/NoteTaker';
import './NewNote.css';

const NewNote = props => {
    document.title = 'New Post';
    return <NoteTaker type='new'/>;
};

export default NewNote;