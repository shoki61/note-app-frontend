import React, { useState } from 'react';
import validator from 'validator';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';
import Image from '../../../shared/components/Image/Image';
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

    const authSubmitHandler = async event => {
        event.preventDefault();
        const { name, email, password, rePassword} = inputs;

        if(mode){
          if(!validator.isEmail(email) || !validator.isLength(password,{min:6})){
            return setError('Please enter valid email.');
          };
          try{
            const data = JSON.stringify({email, password});
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`,{
              method: 'POST',
              headers:{
                'Content-Type' : 'application/json'
              },
              body: data
            });
            const responseData = await response.json();
            if(responseData.user){
              props.onLogin(responseData.user);
              history.push('/');
            }else{
              setError(responseData.message);
            };
          } catch(e){
            setError(e);
          };
        }else{
          if(!validator.isLength(name) || !validator.isEmail(email) || !validator.isLength(password,{min:6}) || password !== rePassword){
            return setError('Error. Please check valid inputs');
          };
          try {
            const data = JSON.stringify({name, email, password});
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`,{
              method: 'POST',
              headers:{
                'Content-Type' : 'application/json'
              },
              body: data
            });
            const responseData = await response.json();
            props.onSignUp(responseData.user);
            history.push('/users');
          } catch(e){
            throw setError('Unknown error. Please try again');
          };
        };
    };

    const changeMode = () => {
      setError();
      setMode(prevMode => !prevMode);
    };
    return(
        <div className='auth center'>
          <div className='auth-top-img-container'>
            <Image className='auth-top-img auth-back-img' src={require('../../../assets/authTop.png').default} alt='top-img'/>
          </div>
          <div className='auth-form-container animate__animated animate__slideInLeft center'>
              <form onSubmit={authSubmitHandler} className='auth-form'>
                  {!mode && <>
                      <p className='auth-title'>Your Name</p>
                      <Input 
                        id='name'
                        value={inputs.name}
                        type='text'
                        onChange={inputHandler}
                        className='auth-input input-full' 
                        element='input'
                      />
                  </>}
                  <p className='auth-title'>E-mail</p>
                  <Input
                      id='email'
                      type='email'
                      value={inputs.email}
                      onChange={inputHandler}
                      className='auth-input input-full'
                      element='input'
                  />
                  <p className='auth-title'>Password</p>
                  <Input
                      id='password'
                      type='password'
                      onChange={inputHandler}
                      value={inputs.password}
                      className='auth-input input-full'
                      element='input'
                  />
                  {!mode && <>
                    <p className='auth-title'>Password Repeat</p>
                    <Input
                      id='rePassword'
                      type='password'
                      onChange={inputHandler}
                      value={inputs.rePassword}
                      className='auth-input input-full'
                      element='input'
                    />
                  </>}
                  {error && <p className='error-message animate__animated animate__headShake'><i className='fa fa-warning'></i> {error}</p>}
                  <Button type='submit' className='black auth-button mb-2'>{mode ? 'LOGIN' : 'SING UP'}</Button>
                  <p className='switch-text'>
                      {mode ? "Aren't you a member?" : "Are you already a member?"} 
                      <span onClick={changeMode} className='switchButton'>{mode ? 'Sign up': 'Login'}</span>
                  </p>
              </form>
          </div>
          <div className='vector-icon-container center'>
            <Image className='auth-vektor animate__animated animate__fadeInRight' src={require('../../../assets/authVector.png').default} alt='vector'/>
          </div>
          <div className='auth-bottom-img-container'>
            <Image className='auth-bottom-img auth-back-img' src={require('../../../assets/authBottom.png').default} alt='top-img'/>
          </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: (user) => dispatch(actions.authLogin(user)),
    onSignUp: (user) => dispatch(actions.authSignUp(user))
  };
};

export default connect(null, mapDispatchToProps)(Auth);