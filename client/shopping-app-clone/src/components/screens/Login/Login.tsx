import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputElementTwo from 'components/common/input/InputElementTwo';
import Button from 'components/common/button/Button';
import Footer from 'components/common/footer/Footer';
import 'assets/scss/screens/login/login.scss';

const Login = () => {
  const [email, setEmail] = useState({ emailAddress: '' });
  const [password, setPassword] = useState({ password: '' });

  return (
    <div className='screen login'>
      <div className='col-5 mb-4 mx-auto p-4 login__modal'>
        <h2>Login</h2>
        <div className='my-2'>
          <InputElementTwo
            placeholder='Email Address'
            label='Email Address'
            property='password'
            setUserInfo={setEmail}
            userInfo={email}
            padding='py-3'
            errorString='please enter your email address'
          />
        </div>
        <div className='my-2'>
          <InputElementTwo
            placeholder='password'
            label='Password'
            property='password'
            setUserInfo={setPassword}
            userInfo={password}
            padding='py-3'
            errorString='please enter password'
          />
        </div>
        <div className='mt-3 w-100'>
          <Button
            type={'pri'}
            size={'mid'}
            text={'login'}
            width={'100'}
            clickHandle={() => null}
          />
        </div>
        <div className='login__conditions d-flex justify-content-between mt-2'>
          <div className='d-flex align-items-center'>
            <input type='checkbox' id='remember' className='form__checkbox' />
            <p className='mb-0 p-1'>Remember me</p>
          </div>
          <div className='py-1'>
            <Link to='#'>
              <p className='mb-0 '>forgot password ?</p>
            </Link>
          </div>
        </div>
        <div className='mt-2 text-center'>
          <Link to='/signup'>
            Create new Account <span className='fas fa-arrow-right-long'></span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
