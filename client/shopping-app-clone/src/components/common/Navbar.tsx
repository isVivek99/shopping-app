import React, { useState } from 'react';
import 'assets/scss/common.scss';
import 'assets/scss/common/navbar.scss';
import brandImage from 'assets/images/Brand.png';
import InputElementOne from './input/InputElementOne';
import { SidebarData } from 'components/common/sideBarData';
function navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

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
      <div className='d-block d-lg-none '>
        <div className='navbar__sidebar'>
          <div className='fa__icon__size__lg px-3'>
            <i className='fas fa-bars' onClick={showSidebar}></i>
          </div>
          <img src={brandImage} alt='brandImage' />
          <div className='d-flex'>
            <div className='fa__icon__size__lg px-3'>
              <i className='fas fa-user'></i>
            </div>
            <div className='position-relative'>
              <div className='position-absolute text-center cart__item__count'>
                <span className='f-12'>4</span>
              </div>
              <div className='fa__icon__size__lg px-3'>
                <i className='fas fa-bag-shopping'></i>
              </div>
            </div>
          </div>
        </div>
        <div className='my-2'>
          <InputElementOne />
        </div>
        <nav className={sidebar ? 'nav__menu__active' : 'nav__menu'}>
          <ul className='nav-menu-items p-0'>
            <li className='navbar-toggle d-flex justify-content-between align-items-center'>
              <p className='f-18 bold text-white my-2 ps-2 '>HOME</p>
              <div className='fa__icon__size px-3'>
                <i className='fas fa-x' onClick={showSidebar}></i>
              </div>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <li
                  key={index}
                  className={item.cName + ' my-0'}
                  style={{ color: 'black' }}
                >
                  <p className='my-2 px-2'>{item.title}</p>
                  <hr className='my-0' />
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default navbar;
