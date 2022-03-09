import React, { useState } from 'react';
import 'assets/scss/common.scss';
import 'assets/scss/common/navbar.scss';
import brandImage from 'assets/images/Brand.png';
import brandImageWhite from 'assets/images/brand-white.png';
import brandImageWhiteMobile from 'assets/images/brand-white-mobile.png';
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
          <img
            src={brandImageWhite}
            alt='brandImage'
            className='d-none d-sm-block'
          />
          <img
            src={brandImageWhiteMobile}
            alt='brandImage'
            className='d-block d-sm-none'
          />
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
              <div className='fa__icon__size__lg px-3'>
                <i className='fas fa-x' onClick={showSidebar}></i>
              </div>
            </li>

            {SidebarData.map((item, index) => {
              return (
                <div key={index}>
                  <li
                    className={item.cName + ' my-0'}
                    style={{ color: 'black' }}
                  >
                    <div className=' d-flex justify-content-between'>
                      <p className='my-2 px-2 f-14'>{item.title}</p>
                      {item.icon && (
                        <div className='my-2 px-2 fa__icon__size__lg_black'>
                          <i className={item.icon}></i>
                        </div>
                      )}
                    </div>
                    <div>
                      {item.data?.map((dataItem, i) => {
                        return (
                          <div key={i}>
                            {dataItem.subcategories.map(
                              (category, categoryIndex) => (
                                <div key={categoryIndex}>
                                  <p className='my-2 px-2 f-14'>{category}</p>
                                  <hr className='my-0' />
                                </div>
                              )
                            )}
                            {dataItem.contact.map(
                              (contactType, categoryIndex) => {
                                return (
                                  <div key={categoryIndex}>
                                    {contactType.twitter.map(
                                      (twitterLink, twitterIndex) => (
                                        <div key={twitterIndex}>
                                          <a
                                            style={{
                                              textDecoration: 'none',
                                              color: 'black',
                                            }}
                                            className=' px-2 my-3 f-14'
                                            href={twitterLink}
                                            target='_blank'
                                            rel='noreferrer'
                                          >
                                            {twitterLink.substring(20)}
                                          </a>
                                          <hr className='my-0' />
                                        </div>
                                      )
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </li>
                  <hr className='my-0' />
                </div>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default navbar;
