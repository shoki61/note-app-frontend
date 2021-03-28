import React, { useEffect, useState } from 'react';


import Card from '../../../shared/components/Card/Card';
import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';
import UploadProfileImg from '../../../users/components/UploadProfileImg/UploadProfileImg';
import UpdateLink from '../../components/UpdateLink/UpdateLink';
import './UpdateProfile.css';

const UpdateProfile = props => {
    const [newImage, setNewImage] = useState(null);
    const [file, setFile] = useState();
    const { name, email, job, image, id } = props.location.state;


    const newImageHandler = (img, file) => {
        setNewImage(img);
        setFile(file)
    };

    const saveNewUserData = async () => {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('name', name);
        formData.append('image', file);
        formData.append('job', job);
        console.log(file);
        const response = await fetch(`http://localhost:5000/api/users/update-user/${id}`, {
            method: 'PATCH',
            body: formData
        })

        const responseData = await response.json();
        console.log(responseData);
    };


    return(
        <div className='update-profile-container'>
            <Card>
                <div className='update-profile-form-container'>
                    {JSON.stringify(newImage)}
                    {newImage && <img src={newImage} style={{width: 100}}/>}
                    <UploadProfileImg imageHandler={newImageHandler} initialValue={image}/>
                    <p className='update-profile-title'>Name</p>
                    <Input value={name} element='input' className='input-full'/>

                    <p className='update-profile-title'>Job</p>
                    <Input value={job} placeholder='ender job...' element='input' className='input-full'/>

                    <p className='update-profile-title'>E-mail</p>
                    <Input element='input' className='input-full' value={email}/>

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