import React from 'react';

import './Image.css';

const Image = props => {
    return (
        <img className={`image ${props.className}`} src={props.src} alt={props.alt}/>
    );
};

export default Image;