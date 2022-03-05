import React from 'react';
import 'assets/scss/common.scss';
import 'assets/scss/common/navbar.scss';
import brandImage from 'assets/images/Brand.png';
import InputElementOne from './input/InputElementOne';
function navbar() {
  return (
    <div>
      <div className='d-flex justify-content-between '>
        <div className='d-flex'>
          <p className='px-2 f-12 text-green'>Chat with us</p>
          <p className='px-2 f-12'> +420 336 775 664</p>
          <p className='px-2 f-12'>info@freshnesecom.com</p>
        </div>
        <div className='d-flex'>
          <p className='px-2 f-12 text-green'>Blog</p>
          <p className='px-2 f-12 text-green'>About Us</p>
          <p className='px-2 f-12 text-green'>Careers</p>
        </div>
      </div>
      <hr />
      <div className='d-flex align-items-center mx-3'>
        <img src={brandImage} alt='brandImage' />
        <InputElementOne />

        <div className='fa__icon__size px-3'>
          <i className='fas fa-user'></i>
        </div>
        <div className='position-relative'>
          <div
            className='position-absolute text-center'
            style={{
              backgroundColor: '#E5704B',
              width: '24px',
              height: '24px',
              borderRadius: '12px',
              top: '12px',
            }}
          >
            <span style={{ color: 'white', fontSize: '12px' }}>4</span>
          </div>
          <div className='fa__icon__size px-3'>
            <i className='fas fa-bag-shopping'></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default navbar;
