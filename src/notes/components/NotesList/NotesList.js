import React from 'react';


import NoteItem from './NoteItem/NoteItem';
import ProfilePostItem from './ProfilePostItem/ProfilePostItem';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './NotesList.css';

const NotesList = props => {

    let noteItem = <Spinner/>;
    if(props.data){
        noteItem = props.type === 'profile'
            ? props.data.map(post => <ProfilePostItem
                key={post._id}
                id={post._id}
                hidden={post.hidden}
                image={post.image}
                title={post.title}
                description={post.description}
                likes={post.likes}
                comments={post.comments}
                markings={post.markings}
                createdDate={post.updatedAt}
            />)
            : props.data.map(post => <NoteItem
                key={post._id}
                id={post._id}
                image={post.image}
                title={post.title}
                creator={post.creator}
                description={post.description}
                createdDate={post.updatedAt}
        />);
    }else{
        noteItem = <p className='posts-not-found'>Posts Not Found</p>
    };
    return <div>
        {noteItem}
    </div>
};
export default NotesList;