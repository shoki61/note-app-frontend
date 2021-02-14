import React, { useState } from 'react';


import Image from '../../../shared/components/Image/Image';
import Button from '../../../shared/components/Button/Button';
import NotesList from '../../../notes/components/NotesList/NotesList';
import Opacity from '../../../shared/components/Opacity/Opacity';
import Input from '../../../shared/components/Input/Input';
import './Profile.css';


const DUMMY_DATA = [
    {
        userInfo:{
            id:1,
            name: 'Murat Artan',
            job:'Developer',
            image: 'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            followed:30,
            follower:623,
            links: {
                facebook:'',
                instagram:'',
                web:'',
                twitter:''
            },
            notes:[
                {
                    id:1,
                    title: 'Lorem ipsum dolor sit amet',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image:'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    createdDate: '08.02.2021'
                },
                {
                    id:2,
                    title: 'Consectetur adipiscing elit',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                    image:'https://images.unsplash.com/photo-1553267751-1c148a7280a1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8bWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
                    createdDate: '13.02.2021'
                }
            ]
        }
    }
]

const Profile = props => {

    const [inputVisible, setInputVisible] = useState(false);

    const changeInputVisible = () => setInputVisible(prevVisible => !prevVisible);
    return (
        <div className='profile-container'>
            <div className='profile-info center'>
                <div className='center'>
                    <div className='profile-image-container center'>
                        <div className='profile-image'>
                            <Image src={DUMMY_DATA[0].userInfo.image} alt='Murat Artan'/>
                            <Opacity>
                                <Button className='white'><i className='fa fa-camera'></i>Upload image</Button>
                            </Opacity>
                        </div>
                        <Button><span className='profile-edit'><i class="glyphicon glyphicon-pencil"></i> edit profile</span></Button>
                    </div>
                    <div>
                        <p className='profile-name'>{DUMMY_DATA[0].userInfo.name}</p>
                        <p className='profile-job'>{DUMMY_DATA[0].userInfo.job}</p>
                        <p className='profile-email'><i className='fa fa-envelope-o'></i>example@gmail.com</p>
                        <div>
                            <span className='profile-box'>Followed: {DUMMY_DATA[0].userInfo.followed}</span>
                            <span className='profile-box'>Follower: {DUMMY_DATA[0].userInfo.follower}</span>
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
                        <Button><i className='fa fa-plus'></i></Button>
                        <Input
                            placeholder='search note...'
                            className='search-note-input'
                            element='input'
                            style={inputVisible ? {width:250, border:'1px solid grey'}:{width:0, padding:0}}
                        />
                        <Button onClick={changeInputVisible}><i className={`fa ${inputVisible ? 'fa-close' : 'fa-search'}`}></i></Button>
                    </div>
                </div>
                <NotesList data={DUMMY_DATA[0].userInfo.notes}/>
            </div>
        </div>
    );
};

export default Profile;