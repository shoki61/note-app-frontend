import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';


import Image from '../../../shared/components/Image/Image';
import Button from '../../../shared/components/Button/Button';
import NotesList from '../../../notes/components/NotesList/NotesList';
import Input from '../../../shared/components/Input/Input';
import Spinner from '../../../shared/components/Spinner/Spinner';
import './Profile.css';


const Profile = props => {
    const [inputVisible, setInputVisible] = useState(false);
    const [user, setUser] = useState();

    useEffect(()=>{
        const getUser = async() => {
            const response = await fetch(`http://localhost:5000/api/users/user/${props.location.state.id}`);
            const responseData = await response.json();
            setUser(responseData);
        };
        getUser();
    }, []);

    const changeInputVisible = () => setInputVisible(prevVisible => !prevVisible);
    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            { user ? <div className='profile-container'>
            <div className='profile-info center'>
                <div className='center'>
                    <div className='profile-image-container center'>
                        <div className='profile-image'>
                            <Image src={user.image ? user.image : require('../../image/defaultImg.png').default} alt='Murat Artan'/>
                        </div>
                        <Button><NavLink to='/update-profile'><span className='profile-edit'><i class="glyphicon glyphicon-pencil"></i> edit profile</span></NavLink></Button>
                    </div>
                    <div>
                        <p className='profile-name'>{user.name}</p>
                        <p className='profile-job'>{user.job}</p>
                        <p className='profile-email'><i className='fa fa-envelope-o'></i>{user.email}</p>
                        <div>
                            <span className='profile-box'>Followed: {user.following.length}</span>
                            <span className='profile-box'>Follower: {user.follower.length}</span>
                        </div>
                    </div>
                </div>
                <div className='prodile-links center'>
                    <Button className='black-outline'><i className='fa fa-facebook'></i></Button>
                    <Button className='black-outline'><i className='fa fa-instagram'></i></Button>
                    <Button className='black-outline'><i className='fa fa-twitter'></i></Button>
                    <Button className='black-outline'><i className='fa fa-link'></i></Button>
                    <Button className='black-outline'>Follow</Button>
                    <Button className='danger-outline'>Delete the account</Button>
                </div>
            </div>
            <div className='line'></div>
            <div className='profile-notes'>
                <div style={{display:'flex', alignItems:'center',marginBottom:15,justifyContent:'space-between'}}>
                    <p className='profile-notes-title'>Notes</p>
                    <div className='center'>
                        <Button><NavLink to='/new-note'><i className='fa fa-plus'></i></NavLink></Button>
                        <Input
                            placeholder='search note...'
                            className='search-note-input'
                            element='input'
                            style={inputVisible ? {width:250, border:'1px solid grey'}:{width:0, padding:0}}
                        />
                        <Button onClick={changeInputVisible}><i className={`fa ${inputVisible ? 'fa-close' : 'fa-search'}`}></i></Button>
                    </div>
                </div>
                { user.notes.length ? <NotesList data={user.notes}/> : <p className='no-notes-text'>There is no user note</p> }
            </div>
        </div> : <Spinner/> }
        </div>
    );
};

export default Profile;