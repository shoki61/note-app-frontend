import React, { useRef, useState, useEffect } from 'react';

import Button from '../Button/Button';
import Image from '../Image/Image';
import './UploadImage.css';

const UploadImage = props => {
    const filePickerRef = useRef();
    const [previewUrl, setPreviewUrl] = useState();

    useEffect(() => {
        if(!previewUrl && props.postImg){
            setPreviewUrl(`${process.env.REACT_APP_ASSETS_URL}/${props.postImg}`);
        };
    }, [previewUrl]);


    const pickedHandler = event => {
        let pickedFile;
        if(event.target.files && event.target.files.length !== 0){
            pickedFile = event.target.files[0];
            const fileReader = new FileReader();
            fileReader.onload = () => {
                setPreviewUrl(fileReader.result);
                props.fileHandler(pickedFile);
            };
            fileReader.readAsDataURL(pickedFile); 
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