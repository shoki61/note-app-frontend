import React, { useState } from 'react';

import Input from '../../../shared/components/Input/Input';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import './Auth.css';

const Auth = props => {
    const [mode, setMode] = useState(true);

    const changeMode = () => setMode(prevMode => !prevMode);
    return(
        <div className='auth'>
            <Card>
                <div className='auth-form-container'>
                    {!mode && <>
                        <p className='auth-title'>Your Name</p>
                        <Input placeholder='enter your name...' className='input-full' element='input'/>
                    </>}
                    <p className='auth-title'>E-mail</p>
                    <Input placeholder='enter e-mail...' className='input-full' element='input'/>
                    <p className='auth-title'>Password</p>
                    <Input placeholder='enter password...' className='input-full' element='input'/>
                    <Button className='black auth-button'>{mode ? 'LOGIN' : 'SING UP'}</Button>
                    <p>
                        {mode ? "Aren't you a member?" : "Are you already a member?"} 
                        <span onClick={changeMode} className='switchButton'>{mode ? 'Sign up': 'Login'}</span>
                    </p>
                </div>
            </Card>
        </div>
    )
};

export default Auth;