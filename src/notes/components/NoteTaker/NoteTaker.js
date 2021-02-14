import React from 'react';

import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import UploadImage from '../../../shared/components/UploadImage/UploadImage';
import './NoteTaker.css';

const NoteTaker = props => {
    return (
        <div className='note-taker-container'>
            <Card>
                <div style={{width:'100%'}}>
                    <p className='note-taker-title'>Title</p>
                    <Input placeholder='enter title...' className='input-full' element='input'/>
                    <p className='note-taker-title'>Description</p>
                    <Input placeholder='enter description...' className='input-full' style={{minHeight:150}}/>
                    <UploadImage/>
                    <div style={{display:'flex',alignItems:'center',marginBottom:30}}>
                        <Input style={{marginRight:7}} element='input' type='checkbox'/>
                        <p className='note-taker-title'>Private</p>
                        <div title='only those who follow you can see' className='note-taker-detail center'>?</div>
                    </div>
                    <Button className='info full'>SUBMIT</Button>
                </div>
            </Card>
        </div>
        
    );
};

export default NoteTaker;