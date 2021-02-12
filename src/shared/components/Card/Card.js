import React from 'react';

import './Card.css';

const Card = props => <div className={`card center box ${props.className}`}>{props.children}</div>;

export default Card;