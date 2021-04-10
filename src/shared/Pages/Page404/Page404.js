import React from 'react';
import { Link } from 'react-router-dom';


import Button from '../../components/Button/Button';
import './Page404.css';

const Page404 = () => <div className='page404 center'>
        <h1 className='page404-code'>404</h1>
        <h2 className='page404-error-message'>The page cannot be found</h2>
        <Link to='/'><Button className='page404-button box-shadow-hover'>Go To Home Page</Button></Link>
</div>

export default Page404;