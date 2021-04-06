import React, { useEffect, useState } from 'react';


import Card from '../../../shared/components/Card/Card';
import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';
import UploadProfileImg from '../../../users/components/UploadProfileImg/UploadProfileImg';
import UpdateLink from '../../components/UpdateLink/UpdateLink';
import './UpdateProfile.css';

const UpdateProfile = props => {
    const [file, setFile] = useState();
    const { name, email, job, image, links, id } = props.location.state;
    const [userData, setUserData] = useState({
        name,
        email,
        job,
        links: links || [{
            linkedin:'',
            facebook:'',
            medium:'',
            instagram:'',
            twitter:'',
            github:'',
            gitlab:'',
            web:''
        }]
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
            };
        });
    };

    const userLinkHanler = event => {
        let updatedLinks = {...userData.links[0]};
        updatedLinks[event.target.id] = event.target.value;
        setUserData(prevData => {
            return {
                ...prevData,
                links: [updatedLinks]
            };
        });
    };


    return(
        <div className='update-profile-container'>
            <Card>
                <div className='update-profile-form-container'>
                    <UploadProfileImg imageHandler={newImageHandler} initialValue={image}/>
                    <p className='update-profile-title mt-2'>Name</p>
                    <Input 
                        value={userData.name} 
                        element='input' 
                        className='input-full update-profile-input'
                        id='name'
                        onChange={inputHandler}
                    />

                    <p className='update-profile-title mt-1'>Job</p>
                    <Input 
                        value={userData.job} 
                        placeholder='ender job...' 
                        element='input' 
                        className='input-full update-profile-input'
                        id='job'
                        onChange={inputHandler}
                    />

                    <p className='update-profile-title mt-1'>E-mail</p>
                    <Input 
                        element='input' 
                        className='input-full update-profile-input' 
                        id='email'
                        value={userData.email}
                        onChange={inputHandler}
                    />

                    <p className='update-profile-title mt-1'>Links</p>
                    <UpdateLink linkHandler={userLinkHanler} id='linkedin' title='Linkedin' value={userData.links[0].linkedin} iconName='fa fa-linkedin'/>
                    <UpdateLink linkHandler={userLinkHanler} id='medium' title='Medium' value={userData.links[0].medium} iconName='fab fa-medium-m'/>
                    <UpdateLink linkHandler={userLinkHanler} id='github' title='Github' value={userData.links[0].github} iconName='fab fa-github'/>
                    <UpdateLink linkHandler={userLinkHanler} id='gitlab' title='Gitlab' value={userData.links[0].gitlab} iconName='fab fa fa-gitlab'/>
                    <UpdateLink linkHandler={userLinkHanler} id='facebook' title='Facebook' value={userData.links[0].facebook} iconName='fa fa-facebook'/>
                    <UpdateLink linkHandler={userLinkHanler} id='instagram' title='Instagram' value={userData.links[0].instagram} iconName='fa fa-instagram'/>
                    <UpdateLink linkHandler={userLinkHanler} id='twitter' title='Twitter' value={userData.links[0].twitter} iconName='fa fa-twitter'/>
                    <UpdateLink linkHandler={userLinkHanler} id='web' title='Web' value={userData.links[0].web} iconName='fa fa-link'/>

                    <div style={{margin:'40px 0 30px 0'}} className='line'></div>
                    <Button onClick={saveNewUserData} className='info full update-profile-button'>Save the change</Button>
                </div>
            </Card>
        </div>
    )
};


export default UpdateProfile;