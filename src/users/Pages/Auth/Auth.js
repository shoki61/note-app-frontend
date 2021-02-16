import React, { useState, useReducer, useCallback } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../../../shared/components/Input/Input';
import Card from '../../../shared/components/Card/Card';
import Button from '../../../shared/components/Button/Button';
import * as actions from '../../../store/actions/index';
import './Auth.css';


const Auth = props => {
    const [mode, setMode] = useState(true);
    const [error, setError] = useState(false);
    const [inputs, setInputs] = useState({
      name:'',
      email:'',
      password: '',
      rePassword: '',
    });
    const history = useHistory();


    const inputHandler = event => {
      setError();
      setInputs(prevInputs => {
        return {
          ...prevInputs,
          [event.target.id]: event.target.value
        };
      });
    };

    const authSubmitHandler = event => {
        event.preventDefault();
        const { name, email, password, rePassword} = inputs;
        if(!mode){
          if(!validator.isLength(name) || !validator.isEmail(email) || !validator.isLength(password,{min:6}) || password !== rePassword){
            return setError('Error. Please check valid inputs');
          };
          props.onSignUp(name, email, password);
          history.push('/users');
        }else{
          if(!validator.isEmail(event.target[0].value)){
            return setError('Please enter valid email.');
          };
          props.onLogin(email,password);
          history.push('/users');
        };
    };

    const changeMode = () => {
      setError();
      setMode(prevMode => !prevMode);
    };
    return(
        <div className='auth'>
            <Card>
                <div className='auth-form-container'>
                    <form onSubmit={authSubmitHandler}>
                        {!mode && <>
                            <p className='auth-title'>Your Name</p>
                            <Input 
                              id='name'
                              value={inputs.name}
                              type='text'
                              onChange={inputHandler}
                              placeholder='enter your name...' 
                              className='input-full' 
                              element='input'
                            />
                        </>}
                        <p className='auth-title'>E-mail</p>
                        <Input
                            id='email'
                            type='email'
                            value={inputs.email}
                            onChange={inputHandler}
                            placeholder='enter e-mail...'
                            className='input-full'
                            element='input'
                        />
                        <p className='auth-title'>Password</p>
                        <Input
                            id='password'
                            type='password'
                            onChange={inputHandler}
                            value={inputs.password}
                            placeholder='enter password...'
                            className='input-full'
                            element='input'
                        />
                        {!mode && <>
                          <p className='auth-title'>Password Repeat</p>
                          <Input
                            id='rePassword'
                            type='password'
                            onChange={inputHandler}
                            value={inputs.rePassword}
                            placeholder='enter password repeat...'
                            className='input-full'
                            element='input'
                          />
                        </>}
                        {error && <p className='error-message'>{error}</p>}
                        <Button type='submit' className='black auth-button'>{mode ? 'LOGIN' : 'SING UP'}</Button>
                        <p>
                            {mode ? "Aren't you a member?" : "Are you already a member?"} 
                            <span onClick={changeMode} className='switchButton'>{mode ? 'Sign up': 'Login'}</span>
                        </p>
                    </form>
                </div>
            </Card>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (email, password) => dispatch(actions.authLogin(email, password)),
    onSignUp: (name, email, password) => dispatch(actions.authSignUp(name, email, password))
  };
};

export default connect(null, mapDispatchToProps)(Auth);