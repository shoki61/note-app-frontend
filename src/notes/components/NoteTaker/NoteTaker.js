import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from '../../../shared/components/Button/Button';
import Input from '../../../shared/components/Input/Input';
import UploadImage from '../../../shared/components/UploadImage/UploadImage';
import SpinnerButton from '../../../shared/components/Spinner/SpinnerButton';
import './NoteTaker.css';

const NoteTaker = props => {
    const { userInfo } = props.userRdcr;
    const history = useHistory();
    const [file, setFile] = useState();
    const [ clicked, setClicked ] = useState(false);
    const [keyword, setKeyword] = useState(props.keywords ? props.keywords.join(' ') : '');
    const [keywords, setKeywords] = useState(props.keywords || []);
    const [inputs, setInputs] = useState({
        title: props.title || '',
        description: props.description || '',
        keywords: props.keywords || [],
        hidden: props.hidden || false,
        creator: userInfo._id
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

    const sendNote = async(value) => {
        const {title, description, keywords, hidden, creator} = inputs;

        setClicked(true);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', file || props.image);
        formData.append('keywords', keywords);
        formData.append('hidden', hidden);
        formData.append('userId', creator);


        let url = `${process.env.REACT_APP_BACKEND_URL}/notes/create-note`;
        if(value === 'update') url = `${process.env.REACT_APP_BACKEND_URL}/notes/update-note/${props.id}`;
        const response = await fetch(url, {
            method: value === 'update' ? 'PATCH' : 'POST',
            body: formData
        });
        if(response.status === 201 || 200) {
            history.push('/notes');
            setClicked(false)
        }else setClicked(false);
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
    const uploadFile = file => {
        setFile(file);
    };


    return (
        <div className='note-taker-container'>
            <div style={{width:'100%'}}>
                <Input 
                    onChange={inputHandler}  
                    placeholder='Title' 
                    className='input-full note-taker-title' 
                    element='input'
                    id='title'
                    value={inputs.title}
                />
                <Input 
                    onChange={inputHandler} 
                    placeholder='Description' 
                    className='input-full note-taker-description mt-1'
                    id='description'
                    value={inputs.description}
                />
                <UploadImage fileHandler={uploadFile} postImg={props.image}/>
                <p className='note-taker-input-title'>Keyword</p>
                <Input 
                    onChange={keywordsHandler} 
                    value={keyword} 
                    element='input'
                    placeholder='add keywords with spaces between them' 
                    className='input-full keyword-input mt-1'
                />
                <div style={{display:'flex',flexWrap:'wrap', marginBottom:45}}>
                    {keywords.map((item, index) => <span key={index} className='note-taker-keyword-item mt-1 mr-1'>{item}<i onClick={() => removeKeyword(index)} className='fa fa-close note-taker-item-remove'></i></span>)}
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
                    <p className='note-taker-input-title'>Private</p>
                    <div title='only those who follow you can see' className='note-taker-detail center'>?</div>
                </div>
                <Button onClick={() => sendNote(props.type)} className='info full post-taker-button'>{clicked ? <SpinnerButton size={20}/> : 'SUBMIT'}</Button>
            </div>
        </div>
        
    );
};

const mapStateToProps = state => {
    return {
        userRdcr: state.userReducer
    };
};

export default connect(mapStateToProps)(NoteTaker);