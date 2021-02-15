import React from 'react';


import Card from '../../../shared/components/Card/Card';
import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';
import UploadProfileImg from '../../../users/components/UploadProfileImg/UploadProfileImg';
import UpdateLink from '../../components/UpdateLink/UpdateLink';
import './UpdateProfile.css';

const UpdateProfile = props => {
    return(
        <div className='update-profile-container'>
            <Card>
                <div className='update-profile-form-container'>
                    <UploadProfileImg/>
                    <p className='update-profile-title'>Name</p>
                    <Input value='Murat Artan' element='input' className='input-full'/>

                    <p className='update-profile-title'>Job</p>
                    <Input value='Developer' element='input' className='input-full'/>

                    <p className='update-profile-title'>E-mail</p>
                    <Input element='input' className='input-full' value='exaple@gmail.com'/>

                    <p className='update-profile-title'>Links</p>
                    <UpdateLink value='loremipsum' iconName='fa fa-facebook'/>
                    <UpdateLink value='@loremipsum' iconName='fa fa-instagram'/>
                    <UpdateLink value='@lorem' iconName='fa fa-twitter'/>
                    <UpdateLink value='loremipsum' iconName='fa fa-link'/>
                    <UpdateLink value='loremipsum' iconName='fa fa-linkedin'/>

                    <div style={{margin:'40px 0 30px 0'}} className='line'></div>
                    <Button className='info full'>Save the change</Button>
                </div>
            </Card>
        </div>
    )
};

export default UpdateProfile;