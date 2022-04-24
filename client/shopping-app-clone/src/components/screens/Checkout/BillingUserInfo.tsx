import { useState, useEffect } from 'react';
import InputElementTwo from 'components/common/input/InputElementTwo';

const BillingUserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    address: '',
    townOrCity: '',
    state: '',
    zipOrPin: '',
  });

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div className=''>
      <h2>Billing Info</h2>
      <p className='f-12 text-gray'>please enter your billing info</p>
      <div className='wrapper mb-4'>
        <div className=''>
          <InputElementTwo
            placeholder='First name'
            label='First name'
            property='firstName'
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            errorString='please enter your name'
          />
        </div>
        <div className=''>
          <InputElementTwo
            placeholder='Last name'
            label='Last name'
            property='lastName'
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            errorString='please enter your last name'
          />
        </div>
      </div>
      <div className='wrapper mb-4'>
        <div className=''>
          <InputElementTwo
            placeholder='Email address'
            label='Email address'
            type='email'
            property='emailAddress'
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            errorString='please check your email id'
          />
        </div>
        <div className=''>
          <InputElementTwo
            placeholder='Phone number'
            label='Phone number'
            type='number'
            property='phoneNumber'
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            errorString='phone number should be 10 digits'
          />
        </div>
      </div>
      <div className='wrapper mb-4'>
        <div className=''>
          <InputElementTwo
            placeholder='Address'
            label='Address'
            property='address'
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            errorString=' please enter your address'
          />
        </div>
        <div className=''>
          <InputElementTwo
            placeholder='Town/City'
            label='Town or City'
            property='townOrCity'
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            errorString='please enter your town or city name'
          />
        </div>
      </div>
      <div className='wrapper'>
        <div className=''>
          <InputElementTwo
            placeholder='State'
            label='Choose a State'
            property='state'
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            errorString='please enter your state name'
          />
        </div>
        <div className=''>
          <InputElementTwo
            placeholder='ZIP/Postal Code'
            label='Postal code or ZIP'
            type='number'
            property='zipOrPin'
            setUserInfo={setUserInfo}
            userInfo={userInfo}
            errorString='please enter your zip code'
          />
        </div>
      </div>
    </div>
  );
};

export default BillingUserInfo;
