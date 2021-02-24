import React, { useState } from 'react';
import { connect } from 'react-redux';

import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import UploadImage from '../../../shared/components/UploadImage/UploadImage';
import './NoteTaker.css';

const NoteTaker = props => {
    const [keyword, setKeyword] = useState('');
    const [keywords, setKeywords] = useState([]);
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image:'',
        keywords: [],
        hidden: false,
        creator: props.userInfo.userId
    });

    const inputHandler = event => {
        setInputs(prevInputs => {
            return {
              ...prevInputs,
              [event.target.id]: event.target.value
            };
        });
    };

    const keywordsHandler = event => {
        setKeyword(event.target.value);
        setKeywords(event.target.value.split(' '));
        setInputs(prevState => {
            return {
                ...prevState,
                keywords: event.target.value.split(' ')
            };
        });
        if(!event.target.value.length){
            setKeywords([]);
        };
    };

    const sendNote = async() => {
        const {title, description, image, keywords, hidden, creator} = inputs;
        const response = await fetch('http://localhost:5000/api/notes/create-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, description, image, keywords, hidden, creator})
        });
        console.log(response.json())
    };

    const hiddenHandler = () => {
        setInputs(prevState =>{
            return {
                ...prevState,
                hidden: !inputs.hidden
            };
        });
    };

    const removeKeyword = i => {
        const updateKeywords = keywords.filter((item, index) =>  index !== i);
        const updateKeywordInput = keywords.filter((item, index) => index !== i).join(' ');
        setKeyword(updateKeywordInput);
        setKeywords(updateKeywords);
        setInputs(prevState => {
            return {
                ...prevState,
                keywords:updateKeywords
            };
        });
    };
    const setFile = (file) => {
        setInputs(prevState => {
            return {
                ...prevState,
                image: ''
            };
        });
    };


    return (
        <div className='note-taker-container'>
            <Card>
                <div style={{width:'100%'}}>
                    <p className='note-taker-title'>Title</p>
                    <Input 
                        onChange={inputHandler}  
                        placeholder='enter title...' 
                        className='input-full' 
                        element='input'
                        id='title'
                        value={inputs.title}
                    />
                    <p className='note-taker-title'>Description</p>
                    <Input 
                        onChange={inputHandler} 
                        placeholder='enter description...' 
                        className='input-full'
                        id='description'
                        style={{minHeight:150}}
                        value={inputs.description}
                    />
                    <UploadImage fileHandler={file => setFile(file)}/>
                    <p className='note-taker-title'>Keyword</p>
                    <Input 
                        onChange={keywordsHandler} 
                        value={keyword} 
                        element='input'
                        placeholder='add keywords with spaces between them...' 
                        className='input-full'
                    />
                    <div style={{display:'flex',flexWrap:'wrap'}}>
                        {keywords.map((item, index) => <span key={index} className='note-taker-keyword box'>{item}<i onClick={() => removeKeyword(index)} className='fa fa-close note-taker-close'></i></span>)}
                    </div>
                    <div style={{display:'flex',alignItems:'center',margin:'15px 0 30px 0'}}>
                        <Input 
                            onChange={hiddenHandler} 
                            style={{marginRight:7}} 
                            element='input' 
                            type='checkbox'
                            value={inputs.hidden}
                            id='private'
                        />
                        <p className='note-taker-title'>Private</p>
                        <div title='only those who follow you can see' className='note-taker-detail center'>?</div>
                    </div>
                    <Button onClick={sendNote} className='info full'>SUBMIT</Button>
                </div>
            </Card>
        </div>
        
    );
};

const mapStateToProps = state => {
    return {
        userInfo: state.userReducer
    };
};

export default connect(mapStateToProps)(NoteTaker);