import React, { useState } from 'react';

import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import UploadImage from '../../../shared/components/UploadImage/UploadImage';
import './NoteTaker.css';

const NoteTaker = props => {
    const [keyword, setKeyword] = useState('');
    const [keywords, setKeywords] = useState([]);

    const inputHandler = event => {
        setKeyword(event.target.value);
        setKeywords(event.target.value.split(' '));
        if(!event.target.value.length){
            setKeywords([])
        }
    };

    const removeKeyword = i => {
        const updateKeywords = keywords.filter((item, index) =>  index !== i);
        const updateKeywordInput = keywords.filter((item, index) => index !== i).join(' ');
        setKeyword(updateKeywordInput);
        setKeywords(updateKeywords);
    };


    return (
        <div className='note-taker-container'>
            <Card>
                <div style={{width:'100%'}}>
                    <p className='note-taker-title'>Title</p>
                    <Input placeholder='enter title...' className='input-full' element='input'/>
                    <p className='note-taker-title'>Description</p>
                    <Input placeholder='enter description...' className='input-full' style={{minHeight:150}}/>
                    <UploadImage/>
                    <p className='note-taker-title'>Keyword</p>
                    <Input onChange={inputHandler} value={keyword} element='input' placeholder='add keywords with spaces between them...' className='input-full'/>
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        {keywords.map((item, index) => <span key={index} className='note-taker-keyword box'>{item}<i onClick={() => removeKeyword(index)} className='fa fa-close note-taker-close'></i></span>)}
                    </div>
                    <div style={{display:'flex',alignItems:'center',margin:'15px 0 30px 0'}}>
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