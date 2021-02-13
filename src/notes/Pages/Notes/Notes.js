import React from 'react';


import NoteList from '../../components/NotesList/NotesList';
import './Notes.css';

const DUMMY_DATA = [
    {
        id: 1,
        image:'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title:'My Title',
        description:'This is my description',
        createdDate: '12.02.2021'
    },
    {
        id: 2,
        image:'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        title:'My Title',
        description:'This is my description',
        createdDate: '12.02.2021'
    },
    {
        id: 3,
        image:'',
        title:'My Title',
        description:'This is my description',
        createdDate: '12.02.2021'
    }
];

const Notes = props => {
    return  <NoteList data={DUMMY_DATA}/>
};

export default Notes;