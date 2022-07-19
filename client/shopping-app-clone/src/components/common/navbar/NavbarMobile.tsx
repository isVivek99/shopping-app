import { useState, useEffect } from 'react';
import 'assets/scss/common/navbar.scss';
import brandImageWhite from 'assets/images/brand-white.png';
import brandImageWhiteMobile from 'assets/images/brand-white-mobile.png';
import InputElementOne from '../input/InputElementOne';
import { SidebarData } from 'utils/sideBarData';
import { useSelector } from 'react-redux';
import rootReducer from 'redux/reducers';
import { Link } from 'react-router-dom';
import { productDetails } from 'utils/productDetails';

function NavbarMobile() {
  // redux
  type RootStore = ReturnType<typeof rootReducer>;

  const productWishList =
    useSelector((state: RootStore) => state?.reduceWishlist?.wishlist) || [];
  const productCartList =
    useSelector((state: RootStore) => state?.reduceProducts?.myState) || [];

  // navbar
  const [sidebar, setSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState(-1);
  const [searchString, setSearchString] = useState('');
  const [searchClickArray, setSearchClickArray] = useState([]);

  const showSidebar = () => setSidebar(!sidebar);
  const showSubcategories = (index: number) => {
    if (activeTab === index) return setActiveTab(-1);
    setActiveTab(index);
  };
  type EffectCallback = () => void;

  useEffect((): EffectCallback => {
    if (sidebar) {
      document.body.style.overflow = 'hidden';
      const screen: any = document.getElementsByClassName('screen');
      screen[0].style.pointerEvents = 'none';
    } else {
      document.body.style.overflow = 'unset';
      checkScreenClass('screen');
    }
    return () => (document.body.style.overflow = 'unset');
  }, [sidebar]);

  const checkScreenClass = (screen: string) => {
    try {
      const screenObj: any = document.getElementsByClassName(screen);
      screenObj[0].style.pointerEvents = 'unset';
    } catch (e: any) {
      console.log(e.message);
    }
  };

  return (
    <>
      <div className='d-block d-lg-none'>
        <div className='navbar__sidebar'>
          <div className='fa__icon__size__lg px-3 d-flex align-items-center'>
            <i className='fas fa-bars' onClick={showSidebar}></i>
          </div>
          <div>
            <Link to='/'>
              <img
                src={brandImageWhite}
                alt='brandImage'
                className='d-none d-sm-block'
              />
            </Link>
            <Link to='/'>
              <img
                src={brandImageWhiteMobile}
                alt='brandImage'
                className='d-block d-sm-none'
              />
            </Link>
          </div>
          <div className='d-flex'>
            <Link to='/wishlist'>
              <div className='position-relative'>
                <div className='position-absolute text-center wishlist__item__count'>
                  <span className='f-12'>{productWishList.length}</span>
                </div>
              </div>
              <div className='fa__icon__size__lg px-3'>
                <i className='fas fa-heart mx-0'></i>
              </div>
            </Link>
            <div className='fa__icon__size__lg px-3'>
              <i className='fas fa-user'></i>
            </div>
            <div className='position-relative'>
              <div className='position-absolute text-center cart__item__count'>
                <span className='f-12'>{productCartList.length}</span>
              </div>
              <Link to='/cart'>
                <div className='fa__icon__size__lg px-3'>
                  <i className='fas fa-bag-shopping'></i>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className='my-2'>
          <InputElementOne
            productArray={productDetails}
            setSearchClickArray={setSearchClickArray}
            setSearchString={setSearchString}
          />
        </div>
      </div>
      <nav
        className={
          sidebar ? 'nav__menu__active d-lg-none' : 'nav__menu d-lg-none'
        }
      >
        <ul className='nav-menu-items p-0'>
          <li className='navbar-toggle d-flex justify-content-between align-items-center mt-0'>
            <Link to='/' className='text__link'>
              <p className='f-18 bold text-white my-2 ps-2 '>HOME</p>
            </Link>
            <div className='fa__icon__size__lg px-3'>
              <i className='fas fa-x' onClick={showSidebar}></i>
            </div>
          </li>

          {SidebarData.map((item, index) => {
            return (
              <div key={index}>
                <li className={item.cName + ' my-0'} style={{ color: 'black' }}>
                  <div className=' d-flex justify-content-between'>
                    <p className='my-2 px-2 f-14'>{item.title}</p>
                    {item.icon && (
                      <div className='my-2 px-2 fa__icon__size__lg_black'>
                        <i
                          className={item.icon}
                          onClick={() => showSubcategories(index)}
                        ></i>
                      </div>
                    )}
                  </div>

                  <div>
                    {item.data?.map((dataItem, i) => {
                      return (
                        <div
                          key={i}
                          className={
                            activeTab === index
                              ? 'navbar__subcategories__active'
                              : 'navbar__subcategories'
                          }
                        >
                          {dataItem.subcategories.map(
                            (category, categoryIndex) => (
                              <Link
                                key={categoryIndex}
                                to={`${category.path}`}
                                className='text__link'
                              >
                                <div>
                                  <p className='my-2 px-2 f-14'>
                                    {category.title}
                                  </p>
                                  <hr className='my-0' />
                                </div>
                              </Link>
                            )
                          )}
                          {dataItem.contact.map(
                            (contactType, categoryIndex) => {
                              return (
                                <div key={categoryIndex}>
                                  {contactType.twitter.map(
                                    (twitterLink, twitterIndex) => (
                                      <div key={twitterIndex}>
                                        <div className='my-2'>
                                          <a
                                            style={{
                                              textDecoration: 'none',
                                              color: 'black',
                                            }}
                                            className=' px-2 f-14'
                                            href={twitterLink}
                                            target='_blank'
                                            rel='noreferrer'
                                          >
                                            {twitterLink.substring(20)}
                                          </a>
                                        </div>
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
                {activeTab !== index && <hr className='my-0' />}
              </div>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default NavbarMobile;
