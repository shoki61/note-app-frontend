import React, { useEffect, useState } from 'react';


import Card from '../../../shared/components/Card/Card';
import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';
import UploadProfileImg from '../../../users/components/UploadProfileImg/UploadProfileImg';
import UpdateLink from '../../components/UpdateLink/UpdateLink';
import './UpdateProfile.css';

const UpdateProfile = props => {
    const [file, setFile] = useState();
    const { name, email, job, image, id } = props.location.state;
    const [userData, setUserData] = useState({
        name,
        email,
        job
    });

    const newImageHandler = file => {
        setFile(file)
    };

    const saveNewUserData = async () => {
        const formData = new FormData();
        formData.append('email', userData.email);
        formData.append('name', userData.name);
        formData.append('image', file || image);
        formData.append('job', userData.job);
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/update-user/${id}`, {
            method: 'PATCH',
            body: formData
        })
        const responseData = await response.json();
    };

    const inputHandler = event => {
        setUserData(prevData => {
            return {
                ...prevData,
                [event.target.id]: event.target.value
            }
        })
    };


    return(
        <div className='update-profile-container'>
            <Card>
                <div className='update-profile-form-container'>
                    <UploadProfileImg imageHandler={newImageHandler} initialValue={image}/>
                    <p className='update-profile-title'>Name</p>
                    <Input 
                        value={userData.name} 
                        element='input' 
                        className='input-full'
                        id='name'
                        onChange={inputHandler}
                    />

                    <p className='update-profile-title'>Job</p>
                    <Input 
                        value={userData.job} 
                        placeholder='ender job...' 
                        element='input' 
                        className='input-full'
                        id='job'
                        onChange={inputHandler}
                    />

                    <p className='update-profile-title'>E-mail</p>
                    <Input 
                        element='input' 
                        className='input-full' 
                        id='email'
                        value={userData.email}
                        onChange={inputHandler}
                    />

                    <p className='update-profile-title'>Links</p>
                    <UpdateLink value='loremipsum' iconName='fa fa-facebook'/>
                    <UpdateLink value='@loremipsum' iconName='fa fa-instagram'/>
                    <UpdateLink value='@lorem' iconName='fa fa-twitter'/>
                    <UpdateLink value='loremipsum' iconName='fa fa-link'/>
                    <UpdateLink value='loremipsum' iconName='fa fa-linkedin'/>

                    <div style={{margin:'40px 0 30px 0'}} className='line'></div>
                    <Button onClick={saveNewUserData} className='info full'>Save the change</Button>
                </div>
            </Card>
        </div>
    )
};


export default UpdateProfile;