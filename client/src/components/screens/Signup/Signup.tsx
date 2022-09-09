import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import InputElementTwo from 'components/common/input/InputElementTwo';
import Button from 'components/common/button/Button';
import Footer from 'components/common/footer/Footer';
import { addUser } from 'actions';
import rootReducer from 'redux/reducers';
import 'assets/scss/screens/login/login.scss';
interface userDetails {
  fName: string;
  email: string;
}
interface userObject {
  userDetails: userDetails;
  userLoggedIn: boolean;
}

const Signup = () => {
  //dispatch action
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState({ firstName: '' });
  const [lastName, setLastName] = useState({ lastName: '' });
  const [email, setEmail] = useState({ emailAddress: '' });
  const [password, setPassword] = useState({ password: '' });

  type RootStore = ReturnType<typeof rootReducer>;

  const { userDetails, userLoggedIn }: userObject =
    useSelector((state: RootStore) => state?.reduceUsers) || {};
  console.log(userDetails, userLoggedIn);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addUser({ firstName, lastName, email, password }));
  };

  useEffect(() => {
    if (userLoggedIn) {
      navigate('../', { replace: true });
    }
  }, [userLoggedIn]);

  return (
    <div className='screen login'>
      <div className='col-5 mb-4 mx-auto p-4 login__modal'>
        <h2>Signup</h2>
        <div className='my-2'>
          <InputElementTwo
            placeholder='Pavan'
            label='First name'
            property='firstName'
            setUserInfo={setFirstName}
            userInfo={firstName}
            padding='py-3'
            errorString='please enter your firstname'
          />
        </div>
        <div className='my-2'>
          <InputElementTwo
            placeholder='Last Name'
            label='Last name'
            property='lastName'
            setUserInfo={setLastName}
            userInfo={lastName}
            padding='py-3'
            errorString='please enter your lastname'
          />
        </div>
        <div className='my-2'>
          <InputElementTwo
            placeholder='Email Address'
            label='Email Address'
            property='emailAddress'
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
            errorString='please enter password'
          />
        </div>
        <div className='mt-3 w-100'>
          <Button
            type={'pri'}
            size={'mid'}
            text={'signup'}
            width={'100'}
            clickHandle={(e: any) => handleSubmit(e)}
          />
        </div>
        <div className='login__conditions d-flex justify-content-between mt-2'>
          <div className='d-flex align-items-center'>
            <input type='checkbox' id='remember' className='form__checkbox' />
            <p className='mb-0 p-1'>Accept all terms and conditions</p>
          </div>
          <div className='py-1'>
            <Link to='#'>
              <p className='mb-0 '>forgot password ?</p>
            </Link>
          </div>
        </div>
        <div className='mt-2 text-center'>
          <Link to='/login'>
            ALready have an account?{' '}
            <span className='fas fa-arrow-right-long'></span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
