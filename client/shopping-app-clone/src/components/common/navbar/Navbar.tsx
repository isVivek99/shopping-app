import React from 'react';
import 'assets/scss/common.scss';
import 'assets/scss/common/navbar.scss';
import brandImage from 'assets/images/Brand.png';
import InputElementOne from 'components/common/input/InputElementOne';
import NavbarMobile from 'components/common/navbar/NavbarMobile';
function navbar() {
  return (
    <div>
      <div
        className='d-flex justify-content-between  d-none d-lg-flex mx-auto'
        style={{ width: '98%' }}
      >
        <div className='d-flex '>
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
      <div className='mx-auto' style={{ width: '98%' }}>
        <hr className='d-flex d-none d-lg-flex mt-1 mb-4' />
      </div>
      <div className='d-flex align-items-center mx-3 d-none d-lg-flex mb-4'>
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
      <div className='d-lg-flex justify-content-around px-2 my-1 navbar__dropdown  d-none'>
        <div className='d-flex align-items-center'>
          <p className='px-1 f-14 m-0 py-2'>Bakery</p>
          <i className='fas fa-angle-down'></i>
        </div>
        <div className='d-flex align-items-center'>
          <p className='px-1 f-14 m-0 py-2'>Fruits and vegetables</p>
          <i className='fas fa-angle-down'></i>
        </div>
        <div className='d-flex align-items-center'>
          <p className='px-1 f-14 m-0 py-2'>Meat and fish</p>
          <i className='fas fa-angle-down'></i>
        </div>
        <div className='d-flex align-items-center'>
          <p className='px-1 f-14 m-0 py-2'>drinks</p>
          <i className='fas fa-angle-down'></i>
        </div>
      </div>
      <NavbarMobile />
    </div>
  );
}

export default navbar;
