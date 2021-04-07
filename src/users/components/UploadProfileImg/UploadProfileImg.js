import React, { useRef, useState, useEffect } from 'react';

import Button from '../../../shared/components/Button/Button';
import Image from '../../../shared/components/Image/Image';
import Opacity from '../../../shared/components/Opacity/Opacity';
import './UploadProfileImg.css';

const UploadProfileImg = props => {
    const filePickerRef = useRef();
    const [previewUrl, setPreviewUrl] = useState();

    useEffect(() => {
        if(!previewUrl && props.initialValue) {
            setPreviewUrl(`${process.env.REACT_APP_ASSETS_URL}/${props.initialValue}`);
        };
    }, [previewUrl]);

    const pickedHandler = async event => {
        let pickedFile;

        pickedFile = event.target.files[0];

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
            props.imageHandler(pickedFile);
        };
        fileReader.readAsDataURL(pickedFile);        
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
        <div onClick={pickImageHandler}>
            <div className='profile-image'>
                {previewUrl
                    ? <Image className='profile-image' src={previewUrl}/>
                    : <p className='avatar-name font-50'>{props.userName.charAt().toUpperCase()}</p>
                }
                <Opacity>
                    <Button className='white'><i className='fa fa-camera'></i>Upload image</Button>
                </Opacity>
            </div> 
        </div>
    </div>
};

export default UploadProfileImg;