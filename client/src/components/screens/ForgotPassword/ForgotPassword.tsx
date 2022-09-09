import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';
import brandImage from 'assets/images/Brand.png';
import brandImageWhiteMobile from 'assets/images/freshness-mobile-png.png';
import InputElementTwo from 'components/common/input/InputElementTwo';
import Button from 'components/common/button/Button';
import CtaButton from 'components/common/button/CtaButton';
import { setToast } from 'actions';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState({ emailAddress: '' });

  const handleLoginUser = async () => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/auth/forgotpassword',
        {
          email: email.emailAddress,
        }
      );
      console.log(response);
      dispatch(
        setToast({
          message: `${response.data}`,
          variant: 'success',
          show: true,
          position: 'top-right',
        })
      );
    } catch (error) {
      console.log(error.response.data.message);
      dispatch(
        setToast({
          message: `${error.response.data.message}`,
          variant: 'error',
          show: true,
          position: 'top-right',
        })
      );
      setEmail({ emailAddress: '' });
    }
  };

  return (
    <div className='screen'>
      <div className='d-flex justify-content-between align-items-center mb-5 p-2 p-sm-5'>
        <Link to={'/'}>
          <div className='d-none d-sm-block'>
            <img src={brandImage} alt='brandImage' />
          </div>
          <div className='d-block d-sm-none'>
            <img
              src={brandImageWhiteMobile}
              alt='brandImage'
              className='mobile__brand__logo'
            />
          </div>
        </Link>
        <Link to={'/'}>
          <CtaButton text={'explore'} />
        </Link>
      </div>
      <div className='col-11 com-md-5 mb-4 mx-auto p-4  login__modal'>
        <h2>Forgot Password</h2>
        <div className='my-2'>
          <InputElementTwo
            placeholder='Email Address'
            label='Email Address'
            property='emailAddress'
            type='email'
            setUserInfo={setEmail}
            userInfo={email}
            padding='py-3'
            errorString='please enter correct email address'
          />
        </div>
        <div className='mt-3 w-100'>
          <Button
            type={'pri'}
            size={'mid'}
            text={'submit'}
            width={'100'}
            clickHandle={() => handleLoginUser()}
          />
        </div>
      </div>
      <div className='p-2'></div>
    </div>
  );
};

export default ForgotPassword;
