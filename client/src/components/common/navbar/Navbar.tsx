import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import brandImage from 'assets/images/Brand.png';
import InputElementOne from 'components/common/input/InputElementOne';
import CouponModal from 'components/common/couponBanner/Coupon';
import NavbarMobile from 'components/common/navbar/NavbarMobile';
import { useSelector } from 'react-redux';
import rootReducer from 'redux/reducers';
import { Link } from 'react-router-dom';
import { getProductList } from 'utils/urls';
import 'assets/scss/common/navbar.scss';

function Navbar() {
  const getProductListDetails = async () => {
    try {
      const response = await axios.get(getProductList);
      console.log(response.data);

      setProductList(response.data.data.productList);
    } catch (error) {
      console.log(error.message);
    }
  };
  const navigate = useNavigate();
  type RootStore = ReturnType<typeof rootReducer>;
  const productCartList =
    useSelector((state: RootStore) => state?.reduceProducts?.myState) || [];
  const productWishList =
    useSelector((state: RootStore) => state?.reduceWishlist?.wishlist) || [];

  const { userDetails, userLoggedIn } =
    useSelector((state: RootStore) => state?.reduceUsers) || {};

  const [productList, setProductList] = useState([]);
  const [searchClickArray, setSearchClickArray] = useState([]);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    if (searchClickArray.length > 0 || searchString.length > 0) {
      navigate(`../v1/suggestions/${searchString}`);
    }
    getProductListDetails();
  }, [searchClickArray]);

  return (
    <div>
      <div className='d-none d-lg-block'>
        <CouponModal />
      </div>
      <div
        className='d-flex justify-content-between  d-none d-lg-flex mx-auto pt-2'
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
      <div className='d-flex align-items-center mx-3 d-none d-lg-flex mb-4 position-relative'>
        <Link to='/'>
          <img src={brandImage} alt='brandImage' />
        </Link>
        <InputElementOne
          productArray={productList}
          setSearchClickArray={setSearchClickArray}
          setSearchString={setSearchString}
        />

        <div className='position-relative'>
          <Link to={userLoggedIn ? '/wishlist' : '/login'}>
            <div className='position-absolute text-center wishlist__item__count'>
              <span className='f-12'>{productWishList.length}</span>
            </div>
            <div className='fa__icon__size px-3'>
              <i className='fas fa-heart mx-0'></i>
            </div>
          </Link>
        </div>
        <Link to='/login'>
          <div className='fa__icon__size px-3'>
            <i className='fas fa-user'></i>
          </div>
        </Link>
        <div className='position-relative'>
          <Link to='/cart'>
            <div className='position-absolute text-center cart__item__count'>
              <span className='f-12'>{productCartList.length}</span>
            </div>
            <div className='fa__icon__size px-3'>
              <i className='fas fa-bag-shopping'></i>
            </div>
          </Link>
        </div>
      </div>

      <ul className='d-lg-flex justify-content-around align-items-center px-2 my-1 navbar__dropdown  d-none w-100'>
        <Link to='/v1/list/bakery' className='text__link'>
          <li className='d-flex align-items-center navbar__dropdown__item mt-0'>
            <p className='px-1 f-14 m-0 py-2'>Bakery</p>
            <i className='fas fa-angle-down'></i>
          </li>
        </Link>
        <Link to='/v1/list/fruits&vegetables' className='text__link'>
          <li className='d-flex align-items-center navbar__dropdown__item mt-0'>
            <p className='px-1 f-14 m-0 py-2'>Fruits and vegetables</p>
            <i className='fas fa-angle-down'></i>
          </li>
        </Link>
        <Link to='/v1/list/meat&fish' className='text__link'>
          <li className='d-flex align-items-center navbar__dropdown__item mt-0'>
            <p className='px-1 f-14 m-0 py-2'>Meat and fish</p>
            <i className='fas fa-angle-down'></i>
          </li>
        </Link>
        <Link to='/v1/list/drinks' className='text__link'>
          <li className='d-flex align-items-center navbar__dropdown__item mt-0'>
            <p className='px-1 f-14 m-0 py-2'>drinks</p>
            <i className='fas fa-angle-down'></i>
          </li>
        </Link>
      </ul>

      <NavbarMobile />
    </div>
  );
}

export default Navbar;
