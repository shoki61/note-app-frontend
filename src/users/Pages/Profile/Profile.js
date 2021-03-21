import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';


import Image from '../../../shared/components/Image/Image';
import Button from '../../../shared/components/Button/Button';
import NotesList from '../../../notes/components/NotesList/NotesList';
import Input from '../../../shared/components/Input/Input';
import Spinner from '../../../shared/components/Spinner/Spinner';
import Modal from '../../../shared/components/Modal/Modal';
import PersonsList from '../../components/PersonsList/PersonsList';
import * as actions from '../../../store/actions/index';
import './Profile.css';


const Profile = props => {
    const history = useHistory();
    const [ inputVisible, setInputVisible ] = useState(false);
    const [ user, setUser ] = useState();
    const [ userNotes, setUserNotes ] = useState([]);
    const [ notesToRender, setNotesToRender] = useState([]);
    const [ isFollowed, setIsFollowed ] = useState();
    const [ showFollow, setShowFollow ] = useState(false);
    const [ followData, setFollowData ] = useState();
    const [ searchingPost, setSearchingPost ] = useState('');

    const { userInfo, isLoggedIn } = props.userRdcr;


    useEffect(()=>{
        const getUser = async() => {
            const responseUser = await fetch(`http://localhost:5000/api/users/user/${props.location.state.id}`);
            const responseNotes = await fetch(`http://localhost:5000/api/notes/user-notes/${props.location.state.id}`);
            const responseData = await responseUser.json();
            const responseUserNotes = await responseNotes.json();
            setUser(responseData);
            let publicUserNotes;
            if(userInfo){
                publicUserNotes = responseUserNotes.notes.filter(item => item.creator === userInfo._id ? item : item.hidden === false);
            }else{
                publicUserNotes = responseUserNotes.notes.filter(item => item.hidden === false);
            };
            setUserNotes(publicUserNotes);
            setNotesToRender(publicUserNotes);
            if(isLoggedIn) setIsFollowed(responseData.follower.find(item => item._id === userInfo._id));
        };
        if(props.location.state.id) getUser();
    }, [props.location.state.id]);

    const changeInputVisible = () => setInputVisible(prevVisible => !prevVisible);

    const follow = async (followId = null) => {
        let id = props.location.state.id;
        if(followId) id = followId;
        await fetch(`http://localhost:5000/api/users/update-user/${userInfo._id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({follow: id ? id : props.location.state.id})
        }).then(response => response.json())
        .then(responseData => {
            props.onUpdateUser(responseData.user);
            setIsFollowed(responseData.user.following.find(item => item === user._id));
        });
    };

    const deleteAccount = async () => {
        const response = await fetch(`http://localhost:5000/api/users/delete-user/${userInfo._id}`,{
                method: 'DELETE',
        });
        if(response.status === 200) {
            props.isLogout();
            history.push('/users');
        };
    };

    const changeShowFollow = value => {
        setFollowData(value);
        setShowFollow(prevState => !prevState);
    };

    const searchPost = event => {
        setSearchingPost(event.target.value);
        setNotesToRender(userNotes.filter(item => item.title.toLowerCase().includes(event.target.value.toLowerCase())));
    };

    const filterNote = type => {
        if(userInfo && user._id === userInfo._id){
            console.log(userInfo[type].filter(item => item))
            setNotesToRender(userInfo[type].filter(item => item));
        }else{
            console.log(user[type].filter(item => item.hidden === false))
            setNotesToRender(user[type].filter(item => item.hidden === false));
        };
    };

    return (
        <div style={{display:'flex', justifyContent:'center'}}>
            {showFollow && <Modal closeModal={changeShowFollow}>
                <PersonsList 
                    follow={follow}
                    userInfo={userInfo ? userInfo : null} 
                    data={followData} 
                    closeModal={changeShowFollow}
                />
            </Modal>}
            { user ? <div className='profile-container'>
            <div className='profile-info center'>
                <div className='center'>
                    <div className='profile-image-container center'>
                        <div className='profile-image'>
                            {user.image
                                ? <Image src={user.image} alt={user.name}/> 
                                : <p className='avatar-name font-50'>{user.name.charAt().toUpperCase()}</p>
                            }
                        </div>
                        {isLoggedIn && userInfo._id === user._id && <Button>
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
                            <Button onClick={() => changeShowFollow(user.following)} className='profile-box inline'>Following: {user.following.length}</Button>
                            <Button onClick={() => changeShowFollow(user.follower)} className='profile-box inline'>Followers: {user.follower.length}</Button>
                        </div>
                    </div>
                </div>
                <div className='profile-links center'>
                    <Button className='black-outline'><i className='fa fa-facebook'></i></Button>
                    <Button className='black-outline'><i className='fa fa-instagram'></i></Button>
                    <Button className='black-outline'><i className='fa fa-twitter'></i></Button>
                    <Button className='black-outline'><i className='fa fa-link'></i></Button>
                    {isLoggedIn && userInfo._id !== user._id && <Button onClick={() => follow()} className={isLoggedIn && isFollowed ? 'black' : 'black-outline'}>{isLoggedIn && isFollowed ? 'Following' : 'Follow'}</Button>}
                    {isLoggedIn && userInfo._id === user._id && <Button onClick={deleteAccount}  className='danger-outline'>Delete the account</Button>}
                </div>
            </div>
            <div className='line'></div>
            {searchingPost}
            <div className='profile-notes'>
                <div style={{display:'flex', alignItems:'center',marginBottom:15,justifyContent:'space-between'}}>
                <p className='profile-notes-title'>Posts</p>
                    <div className='center'>
                        <Button onClick={() => filterNote('comments')} className='black-outline inline'><i className="fa fa-comment-o"></i> {user.comments.length}</Button>
                        <Button onClick={() => filterNote('markings')} className='black-outline inline'><i className="fa fa-bookmark-o"></i> {user.markings.length}</Button>
                        <Button onClick={() => filterNote('likes')} className='black-outline inline'><i className="fa fa-heart-o"></i> {user.likes.length}</Button>
                        {isLoggedIn && userInfo._id === user._id && <Button><NavLink to='/new-note'><i className='fa fa-plus'></i></NavLink></Button>}
                        <Input
                            placeholder='search note...'
                            className='search-note-input'
                            element='input'
                            value={searchingPost}
                            onChange={searchPost}
                            style={inputVisible ? {width:250, border:'1px solid grey'}:{width:0, padding:0}}
                        />
                        <Button onClick={changeInputVisible}><i className={`fa ${inputVisible ? 'fa-close' : 'fa-search'}`}></i></Button>
                    </div>
                </div>
                { userNotes.length || notesToRender.length
                    ? <NotesList data={notesToRender}/> 
                    : (userNotes.length && searchingPost)
                    ? <p className='no-notes-text mt-2'>No matching posts</p> 
                    : <p className='no-notes-text mt-2'>There is no user posts</p> 
                }
            </div>
        </div>: <Spinner/> }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        userRdcr: state.userReducer
    };
};
const mapDispatchToProps = dispatch => {
    return {
        isLogout: () => dispatch(actions.authLogout()),
        onUpdateUser: user => dispatch(actions.updateUser(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);