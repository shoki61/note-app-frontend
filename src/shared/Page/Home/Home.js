import React from 'react';

import Image from '../components/Image/Image';
import './Home.css';


const Home = () => {
    return <div className='home center'>
        <div className='home-overlay'></div>
        <h1 className='home-title'>MY BLOG</h1>
        <div className='home-logo center'>
        <div className='home-logo-back'></div>
            <h1 className='home-logo-text'>b</h1>
        </div>
    </div>;
};


export default Home;