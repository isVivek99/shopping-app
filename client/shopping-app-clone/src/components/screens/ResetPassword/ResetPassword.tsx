import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import brandImage from 'assets/images/Brand.png';
import brandImageWhiteMobile from 'assets/images/freshness-mobile-png.png';
import InputElementTwo from 'components/common/input/InputElementTwo';
import Button from 'components/common/button/Button';
import CtaButton from 'components/common/button/CtaButton';
import { setToast } from 'actions';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { email, token } = useParams();

  const [newPasswordOne, setNewPasswordOne] = useState({ password: '' });
  const [newPasswordTwo, setOldPasswordTwo] = useState({ password: '' });

  const handleLoginUser = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4011/api/resetPassword/${email}/${token}`,
        {
          newPasswordOne: newPasswordOne.password,
          newPasswordTwo: newPasswordTwo.password,
          email,
          token,
        }
      );
      console.log(response);
      dispatch(
        setToast({
          message: `${response.data.message}`,
          variant: 'success',
          show: true,
          position: 'top-right',
        })
      );
      setNewPasswordOne({ password: '' });
      setOldPasswordTwo({ password: '' });
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
      setNewPasswordOne({ password: '' });
      setOldPasswordTwo({ password: '' });
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
        <h2>Reset Password</h2>
        <div className='my-2'>
          <InputElementTwo
            placeholder='new password'
            label='new password'
            property='password'
            type='password'
            setUserInfo={setOldPasswordTwo}
            userInfo={newPasswordTwo}
            padding='py-3'
            errorString='password length should be more than 6 characters!!'
          />
        </div>
        <div className='my-2'>
          <InputElementTwo
            placeholder='type new password again'
            label='new password'
            property='password'
            type='password'
            setUserInfo={setNewPasswordOne}
            userInfo={newPasswordOne}
            padding='py-3'
            errorString='password length should be more than 6 characters!!'
          />
        </div>
        <div className='mt-3 w-100'>
          <Button
            type={'pri'}
            size={'mid'}
            text={'reset password'}
            width={'100'}
            clickHandle={() => handleLoginUser()}
          />
        </div>
      </div>
      <div className='p-2'></div>
    </div>
  );
};

export default ResetPassword;
