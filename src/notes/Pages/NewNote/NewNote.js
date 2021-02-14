import React from 'react';


import Card from '../../../shared/components/Card/Card';
import './NewNote.css';
import NoteTaker from '../../components/NoteTaker/NoteTaker';

const NewNote = props => {
    return (
        <div className='new-note-container'>
            <Card>
                <NoteTaker/>
            </Card>
        </div>
    );
};

export default NewNote;