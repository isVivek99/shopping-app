import 'assets/scss/common.scss';
import 'assets/scss/common/navbar.scss';
import brandImage from 'assets/images/Brand.png';
import InputElementOne from 'components/common/input/InputElementOne';
import NavbarMobile from 'components/common/navbar/NavbarMobile';
import { useSelector } from 'react-redux';
import reduceProducts from 'reducers';
import { Link } from 'react-router-dom';

function Navbar() {
  type RootStore = ReturnType<typeof reduceProducts>;
  const productList = useSelector((state: RootStore) => state?.myState) || [];
  return (
    <div>
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
      <div className='d-flex align-items-center mx-3 d-none d-lg-flex mb-4'>
        <Link to='/'>
          <img src={brandImage} alt='brandImage' />
        </Link>
        <InputElementOne />

        <div className='fa__icon__size px-3'>
          <i className='fas fa-user'></i>
        </div>
        <div className='position-relative'>
          <Link to='/cart'>
            <div className='position-absolute text-center cart__item__count'>
              <span className='f-12'>{productList.length}</span>
            </div>
            <div className='fa__icon__size px-3'>
              <i className='fas fa-bag-shopping'></i>
            </div>
          </Link>
        </div>
      </div>
      <div className='d-lg-flex justify-content-around align-items-center px-2 my-1 navbar__dropdown  d-none'>
        <Link to='/bakery' className='text__link'>
          <div className='d-flex align-items-center navbar__dropdown__item '>
            <p className='px-1 f-14 m-0 py-2'>Bakery</p>
            <i className='fas fa-angle-down'></i>
          </div>
        </Link>
        <Link to='/fruits&vegetables' className='text__link'>
          <div className='d-flex align-items-center navbar__dropdown__item'>
            <p className='px-1 f-14 m-0 py-2'>Fruits and vegetables</p>
            <i className='fas fa-angle-down'></i>
          </div>
        </Link>
        <Link to='/meat&fish' className='text__link'>
          <div className='d-flex align-items-center navbar__dropdown__item'>
            <p className='px-1 f-14 m-0 py-2'>Meat and fish</p>
            <i className='fas fa-angle-down'></i>
          </div>
        </Link>
        <Link to='/drinks' className='text__link'>
          <div className='d-flex align-items-center navbar__dropdown__item'>
            <p className='px-1 f-14 m-0 py-2'>drinks</p>
            <i className='fas fa-angle-down'></i>
          </div>
        </Link>
      </div>
      <NavbarMobile />
    </div>
  );
}

export default Navbar;
