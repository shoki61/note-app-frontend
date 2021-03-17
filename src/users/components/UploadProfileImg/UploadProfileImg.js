import React, { useRef, useState, useEffect } from 'react';

import Button from '../../../shared/components/Button/Button';
import Image from '../../../shared/components/Image/Image';
import Opacity from '../../../shared/components/Opacity/Opacity';
import './UploadProfileImg.css';

const UploadProfileImg = props => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    useEffect(() => {
        if(!file) {
            if(props.initialValue) return setPreviewUrl(props.initialValue);
        };
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        let pickedFile;
        console.log(event.target.files)
        if(event.target.files && event.target.files.length !== 0){
            pickedFile = event.target.files[0];
            setFile(pickedFile);
        }else{
            console.log('error')
        }
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };
    return <div>
        <input 
            ref={filePickerRef}
            id={props.id} 
            style={{display: 'none'}} 
            type='file' 
            accept='.png,.jpg,.jpeg'
            onChange={pickedHandler}
        />
        <div>
            <div className='profile-image'>
                {previewUrl
                    ? <Image className='profile-image' src={previewUrl}/>
                    : <p>Lorem ipsum</p>
                }
                <Opacity>
                    <Button onClick={pickImageHandler} className='white'><i className='fa fa-camera'></i>Upload image</Button>
                </Opacity>
            </div> 
            
        </div>
    </div>
};

export default UploadProfileImg;