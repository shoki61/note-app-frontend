import React from 'react';

import Input from '../../../shared/components/Input/Input';
import './UpdateLink.css';

const UpdateLink = props => {
   return (
       <div className='center update-link-container'>
           <div className='icon-container center'><i className={props.iconName}></i></div>
           <Input element='input' value={props.value} className='updateLinkInput full'/>
       </div>
   );
};

export default UpdateLink;