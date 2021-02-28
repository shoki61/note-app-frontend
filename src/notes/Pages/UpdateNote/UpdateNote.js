import React from 'react';


import NoteTaker from '../../components/NoteTaker/NoteTaker';
import './UpdateNote.css';

const UpdateNote = props => {
    const note = props.location.state.note;
    return <NoteTaker
        title={note.title}
        description={note.description}
        image={note.image}
        hidden={note.hidden}
        keywords={note.keywords}
    />;
};

export default UpdateNote;