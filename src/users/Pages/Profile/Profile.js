import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';


import Image from '../../../shared/components/Image/Image';
import Button from '../../../shared/components/Button/Button';
import NotesList from '../../../notes/components/NotesList/NotesList';
import Input from '../../../shared/components/Input/Input';
import Spinner from '../../../shared/components/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import './Profile.css';


const Profile = props => {
    const history = useHistory();
    const [ inputVisible, setInputVisible ] = useState(false);
    const [ user, setUser ] = useState();
    const [ userNotes, setUserNotes ] = useState([]);
    const [ isFollowed, setIsFollowed ] = useState(false);
    const { userId, isLoggedIn } = props.userInfo;

    useEffect(()=>{
        const getUser = async() => {
            const responseUser = await fetch(`http://localhost:5000/api/users/user/${props.location.state.id}`);
            const responseNotes = await fetch(`http://localhost:5000/api/notes/user-notes/${props.location.state.id}`);
            const responseData = await responseUser.json();
            const responseUserNotes = await responseNotes.json();
            setUser(responseData);
            setUserNotes(responseUserNotes);
            if(responseData.follower.includes(userId)) setIsFollowed(true);
        };
        if(props.location.state.id) getUser();
    }, []);

    const changeInputVisible = () => setInputVisible(prevVisible => !prevVisible);

    const follow = async () => {
        if(!user.follower.includes(userId)){
            const response = await fetch(`http://localhost:5000/api/users/update-user/${userId}`,{
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({follow: props.location.state.id})
            });
            if(response.status === 200) setIsFollowed(true);
        };
    };

    const deleteAccount = async () => {
        const response = await fetch(`http://localhost:5000/api/users/delete-user/${userId}`,{
                method: 'DELETE',
        });
        if(response.status === 200) {
            props.isLogout();
            history.push('/users');
        };
    };

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            { user ? <div className='profile-container'>
            <div className='profile-info center'>
                <div className='center'>
                    <div className='profile-image-container center'>
                        <div className='profile-image'>
                            <Image src={user.image ? user.image : require('../../image/defaultImg.png').default} alt='Murat Artan'/>
                        </div>
                        {userId === user._id && isLoggedIn && <Button>
                            <NavLink to={{pathname: '/update-profile', state: {name:user.name, email: user.email, image: user.image, job: user.job}}}>
                                <span className='profile-edit'><i className="glyphicon glyphicon-pencil"></i> edit profile</span>
                            </NavLink>
                        </Button>}
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
                    {userId !== user._id && isLoggedIn && <Button onClick={follow} className={isFollowed ? 'black' : 'black-outline'}>{isFollowed ? 'Following' : 'Follow'}</Button>}
                    {userId === user._id && isLoggedIn && <Button onClick={deleteAccount}  className='danger-outline'>Delete the account</Button>}
                </div>
            </div>
            <div className='line'></div>
            <div className='profile-notes'>
                <div style={{display:'flex', alignItems:'center',marginBottom:15,justifyContent:'space-between'}}>
                <p className='profile-notes-title'>Posts</p>
                    <div className='center'>
                        <Button className='black-outline inline'><i className="fa fa-comment-o"></i> {user.comments.length}</Button>
                        <Button className='black-outline inline'><i className="fa fa-bookmark-o"></i> {user.markings.length}</Button>
                        <Button className='black-outline inline'><i className="fa fa-heart-o"></i> {user.likes.length}</Button>
                        {userId === user._id && <Button><NavLink to='/new-note'><i className='fa fa-plus'></i></NavLink></Button>}
                        <Input
                            placeholder='search note...'
                            className='search-note-input'
                            element='input'
                            style={inputVisible ? {width:250, border:'1px solid grey'}:{width:0, padding:0}}
                        />
                        <Button onClick={changeInputVisible}><i className={`fa ${inputVisible ? 'fa-close' : 'fa-search'}`}></i></Button>
                    </div>
                </div>
                { user.notes.length ? <NotesList data={userNotes.notes}/> : <p className='no-notes-text'>There is no user note</p> }
            </div>
        </div>: <Spinner/> }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userInfo: state.userReducer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        isLogout: () => dispatch(actions.authLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);