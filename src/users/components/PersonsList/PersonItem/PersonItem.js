import React from 'react';


import Image from '../../../../shared/components/Image/Image';
import Button from '../../../../shared/components/Button/Button';
import './PersonItem.css';

const PersonItem = props => {
    return <div className='person-item-container'>
        <div style={{display:'flex'}}>
            <Image className='person-item-avatar' src={props.image} alt={props.name}/>
            <div>
                <p className='person-item-name'>{props.name}</p>
                <p className='person-item-job'>{props.job}</p>
            </div>
        </div>
        <Button>Follow</Button>
    </div>;
};


export default PersonItem;