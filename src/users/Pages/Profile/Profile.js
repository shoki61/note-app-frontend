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
import SpinnerButton from '../../../shared/components/Spinner/SpinnerButton';
import * as actions from '../../../store/actions/index';
import './Profile.css';


const Profile = props => {
    document.title = 'Profile';
    const history = useHistory();
    const [ inputVisible, setInputVisible ] = useState(false);
    const [ user, setUser ] = useState();
    const [ userNotes, setUserNotes ] = useState([]);
    const [ notesToRender, setNotesToRender] = useState([]);
    const [ isFollowed, setIsFollowed ] = useState();
    const [ showFollow, setShowFollow ] = useState(false);
    const [ followData, setFollowData ] = useState();
    const [ searchingPost, setSearchingPost ] = useState('');
    const [ clicked, setClicked ] = useState(false);

    const { userInfo, isLoggedIn } = props.userRdcr;    

    useEffect(()=>{
        const getUser = async() => {
            const responseUser = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/user/${props.location.state.id}`);
            const responseNotes = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notes/user-notes/${props.location.state.id}`);
            const responseData = await responseUser.json();
            const responseUserNotes = await responseNotes.json();
            setUser(responseData);
            let publicUserNotes;
            if(userInfo){
                publicUserNotes = responseUserNotes.notes.filter(item => item.creator === userInfo._id ? item : !item.hidden);
            }else{
                publicUserNotes = responseUserNotes.notes.filter(item => !item.hidden);
            };
            setUserNotes(publicUserNotes.reverse());
            setNotesToRender(publicUserNotes);
            if(isLoggedIn) setIsFollowed(responseData.follower.find(item => item._id === userInfo._id));
        };
        if(props.location.state.id) getUser();
    }, [props.location.state.id]);

    const changeInputVisible = () => {
        setSearchingPost('');
        setInputVisible(prevVisible => !prevVisible);
    };

    const follow = async (followId = null) => {
        let id = props.location.state.id;
        if(followId) id = followId;
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/update-user/${userInfo._id}`,{
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({follow: id ? id : props.location.state.id})
        }).then(response => response.json())
        .then(responseData => {
            const { user: userData } = responseData;
            props.onUpdateUser(userData);
            setIsFollowed(userData.following.find(item => item._id === user._id));
        });
    };

    const deleteAccount = async () => {
        setClicked(true);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/delete-user/${userInfo._id}`,{
                method: 'DELETE',
        });
        if(response.status === 200) {
            setClicked(false)
            props.isLogout();
            history.push('/users');
        }else setClicked(false);
    };

    const changeShowFollow = value => {
        setFollowData(value);
        setShowFollow(prevState => !prevState);
    };

    const searchPost = event => {
        setSearchingPost(event.target.value);
        setNotesToRender(userNotes.filter(item => item.title.toLowerCase().includes(event.target.value.toLowerCase())));
    };

    const filterPosts = type => {
        if(userInfo && user._id === userInfo._id){
            setNotesToRender(userInfo[type].filter(item => item));
        }else{
            setNotesToRender(user[type].filter(item => userInfo 
                ? (item.creator === userInfo._id) 
                ? item 
                : !item.hidden
                : !item.hidden
            ));
        };
    };

    return (
        <div className='pt-5 center'>
            {showFollow && <Modal closeModal={changeShowFollow}>
                <PersonsList 
                    follow={follow}
                    userInfo={userInfo ? userInfo : null} 
                    data={followData} 
                    closeModal={changeShowFollow}
                />
            </Modal>}
            { user ? <div id='profile-container' className='profile-container'>
            <div className='profile-info center'>
                <div className='center profile-info-left'>
                    <div className='profile-image-container center'>
                        <div className='profile-image'>
                            {user.image
                                ? <Image src={`${process.env.REACT_APP_ASSETS_URL}/${user.image}`} alt={user.name}/> 
                                : <p className='avatar-name font-50'>{user.name.charAt().toUpperCase()}</p>
                            }
                        </div>
                        {isLoggedIn && userInfo._id === user._id && <Button>
                            <NavLink className='profile-edit-button center' to={{pathname: '/update-profile', state: {name:user.name, email: user.email, image: user.image, job: user.job,links: user.links, id: user._id}}}>
                                <i className="glyphicon glyphicon-pencil"></i><span className='profile-edit'>edit profile</span>
                            </NavLink>
                        </Button>}
                        
                    </div>
                    <div>
                        <p className='profile-name'>{user.name}</p>
                        <p className='profile-job'>{user.job}</p>
                        <p className='profile-email'><i className='fa fa-envelope-o'></i>{user.email}</p>
                        <div className='profile-box-container'>
                            <Button onClick={() => changeShowFollow(user.following)} className='profile-box box-shadow-hover inline'>Following: {user.following.length}</Button>
                            <Button onClick={() => changeShowFollow(user.follower)} className='profile-box box-shadow-hover inline'>Followers: {user.follower.length}</Button>
                        </div>
                    </div>
                </div>
                <div className='profile-info-right'>
                    <div className='profile-links mb-1'>
                        {user.links.linkedin && <Button className='black-round'><a href={user.links.linkedin.search(/http/gi) < 0 ? `https://${user.links.linkedin}`: user.links.linkedin} target='_blank'><i className='fa fa-linkedin'></i></a></Button>}
                        {user.links.facebook && <Button className='black-round'><a href={user.links.facebook.search(/http/gi) < 0 ? `https://${user.links.facebook}`: user.links.facebook} target='_blank'><i className='fa fa-facebook'></i></a></Button>}
                        {user.links.instagram && <Button className='black-round'><a href={user.links.instagram.search(/http/gi) < 0 ? `https://${user.links.instagram}`: user.links.instagram} target='_blank'><i className='fa fa-instagram'></i></a></Button>}
                        {user.links.twitter && <Button className='black-round'><a href={user.links.twitter.search(/http/gi) < 0 ? `https://${user.links.twitter}`: user.links.twitter} target='_blank'><i className='fa fa-twitter'></i></a></Button>}
                        {user.links.github && <Button className='black-round'><a href={user.links.github.search(/http/gi) < 0 ? `https://${user.links.github}`: user.links.github} target='_blank'><i className='fab fa-github'></i></a></Button>}
                        {user.links.gitlab && <Button className='black-round'><a href={user.links.gitlab.search(/http/gi) < 0 ? `https://${user.links.gitlab}`: user.links.gitlab} target='_blank'><i className='fab fa-gitlab'></i></a></Button>}
                        {user.links.medium && <Button className='black-round'><a href={user.links.medium.search(/http/gi) < 0 ? `https://${user.links.medium}`: user.links.medium} target='_blank'><i className='fab fa-medium-m'></i></a></Button>}
                        {user.links.web && <Button className='black-round'><a href={user.links.web.search(/http/gi) < 0 ? `https://${user.links.web}`: user.links.web} target='_blank'><i className='fa fa-link'></i></a></Button>}
                    </div>
                    <div className='mt-1'>
                        {isLoggedIn && userInfo._id !== user._id && <Button onClick={() => follow()} className={isLoggedIn && isFollowed ? 'black' : 'black-outline'}>{isLoggedIn && isFollowed ? 'Following' : 'Follow'}</Button>}
                        {isLoggedIn && userInfo._id === user._id && <Button onClick={deleteAccount}  className='danger-outline delete-acount box-shadow-hover'>{clicked ? <SpinnerButton size={20}/> : 'Delete the account'}</Button>}
                    </div>
                </div>
            </div>
            <div className='line'></div>
            <div className='profile-notes'>
                <div className='profile-posts-container'>
                    <p className='profile-notes-title'>Posts</p>
                    <div className='center profile-posts-top'>
                        <div className='center profile-actions-container'>
                            <Button onClick={() => filterPosts('comments')} className='inline user-action'><i className="fa fa-comment-o user-action-icon"></i> {user.comments.length}</Button>
                            <Button onClick={() => filterPosts('markings')} className='inline user-action'><i className="fa fa-bookmark-o user-action-icon"></i> {user.markings.length}</Button>
                            <Button onClick={() => filterPosts('likes')} className='inline user-action'><i className="fa fa-heart-o user-action-icon"></i> {user.likes.length}</Button>
                        </div>
                        {isLoggedIn && userInfo._id === user._id && <Button className='button black profile-new-post box-shadow-hover ml-2'><NavLink to='/new-note'><i className='fa fa-plus add-icon'></i> Add new post</NavLink></Button>}
                        <div className='center search-post-container'>
                            <Input
                                placeholder='search post...'
                                className='search-note-input ml-1'
                                element='input'
                                value={searchingPost}
                                onChange={searchPost}

                                style={inputVisible ? {width:250, border:'1px solid grey'}:{width:0, padding:0}}
                            />
                            <Button onClick={changeInputVisible}><i className={`fa ${inputVisible ? 'fa-close' : 'fa-search'} profile-input-button`}></i></Button>
                        </div>
                    </div>
                </div>
                { userNotes.length || notesToRender.length
                    ? <NotesList type='profile' data={notesToRender}/> 
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