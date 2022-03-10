import React from 'react';
import 'assets/scss/common.scss';
import 'assets/scss/common/navbar.scss';
import brandImage from 'assets/images/Brand.png';
import InputElementOne from 'components/common/input/InputElementOne';
import NavbarMobile from 'components/common/navbar/NavbarMobile';
function navbar() {
  return (
    <div>
      <div className='d-flex justify-content-between  d-none d-lg-flex'>
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
      <hr className='d-flex justify-content-between  d-none d-lg-flex' />
      <div className='d-flex align-items-center mx-3 d-none d-lg-flex'>
        <img src={brandImage} alt='brandImage' />
        <InputElementOne />

        <div className='fa__icon__size px-3'>
          <i className='fas fa-user'></i>
        </div>
        <div className='position-relative'>
          <div className='position-absolute text-center cart__item__count'>
            <span className='f-12'>4</span>
          </div>
          <div className='fa__icon__size px-3'>
            <i className='fas fa-bag-shopping'></i>
          </div>
        </div>
      </div>
      <NavbarMobile />
    </div>
  );
}

export default navbar;
