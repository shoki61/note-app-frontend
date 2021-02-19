import React, { useRef, useState, useEffect } from 'react';

import Button from '../Button/Button';
import Image from '../Image/Image';
import './UploadImage.css';

const UploadImage = props => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();

    useEffect(() => {
        if(!file) return;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);


    const pickedHandler = event => {
        let pickedFile;
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
        <div className='upload-image-container'>
            { previewUrl && <Image src={previewUrl} alt='Preview'/> }
            { !previewUrl && <Button onClick={pickImageHandler}><i className='fa fa-file-image-o'></i>PICK IMAGE</Button>}
            { previewUrl && <Button style={{margin:'15px 0 30px 0'}} className='info-outline' onClick={pickImageHandler}>Change Image</Button>}
        </div>
    </div>
};

export default UploadImage;