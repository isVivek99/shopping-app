import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginUser, logoutUser } from 'actions';
import brandImage from 'assets/images/Brand.png';
import brandImageWhiteMobile from 'assets/images/freshness-mobile-png.png';
import rootReducer from 'redux/reducers';
import InputElementTwo from 'components/common/input/InputElementTwo';
import Button from 'components/common/button/Button';
import CtaButton from 'components/common/button/CtaButton';
import Footer from 'components/common/footer/Footer';
import 'assets/scss/screens/login/login.scss';

const Login = () => {
  const dispatch = useDispatch();
  interface userDetails {
    fName: string;
    email: string;
  }

  interface userObject {
    userDetails: userDetails;
    userLoggedIn: boolean;
  }
  const [email, setEmail] = useState({ emailAddress: '' });
  const [password, setPassword] = useState({ password: '' });

  type RootStore = ReturnType<typeof rootReducer>;

  const { userDetails, userLoggedIn }: userObject =
    useSelector((state: RootStore) => state?.reduceUsers) || {};
  console.log(userDetails, userLoggedIn);

  const handleLoginUser = () => {
    dispatch(loginUser({ email, password }));
  };
  const handleLogoutUser = () => {
    dispatch(logoutUser({}));
  };

  return (
    <div>
      {!userLoggedIn ? (
        <div className='screen login'>
          <div className='col-5 mb-4 mx-auto p-4 login__modal'>
            <h2>Login</h2>
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
            <div className='my-2'>
              <InputElementTwo
                placeholder='password'
                label='Password'
                property='password'
                type='password'
                setUserInfo={setPassword}
                userInfo={password}
                padding='py-3'
                errorString='password length must be more than 6 characters'
              />
            </div>
            <div className='mt-3 w-100'>
              <Button
                type={'pri'}
                size={'mid'}
                text={'login'}
                width={'100'}
                clickHandle={() => handleLoginUser()}
              />
            </div>
            <div className='login__conditions d-flex justify-content-between mt-2'>
              <div className='d-flex align-items-center'>
                <input
                  type='checkbox'
                  id='remember'
                  className='form__checkbox'
                />
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
                Create new Account{' '}
                <span className='fas fa-arrow-right-long'></span>
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      ) : (
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

          <div className='user_logged_in_info col-10 mx-auto'>
            <div className='user_logged_in'>
              <p className='text-600 f-12'>UserName {userDetails.fName}</p>
              <p className='text-600 f-12'>UserEmail {userDetails.email}</p>

              <div className='mt-3 py-5 w-100'>
                <Button
                  type={'pri'}
                  size={'mid'}
                  text={'logout'}
                  width={'100'}
                  clickHandle={() => handleLogoutUser()}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
