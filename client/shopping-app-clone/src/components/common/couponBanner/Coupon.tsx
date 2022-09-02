import { useState, useEffect } from 'react';
import rootReducer from 'redux/reducers';
import { useSelector } from 'react-redux';
import 'assets/scss/common/coupon/coupon.scss';

const CouponModal = () => {
  type RootStore = ReturnType<typeof rootReducer>;
  const couponObject: any =
    useSelector((state: RootStore) => state?.reduceProducts?.coupon) || {};

  const [couponActiveStatus, setCouponActiveStatus] = useState(false);
  useEffect(() => {
    if (couponObject.applied === false) setCouponActiveStatus(true);
  }, [window.location.pathname]);

  useEffect(() => {
    setCouponActiveStatus(false);
  }, [couponObject.applied === true]);

  return (
    <div
      className={`screen mx-auto row coupon__container position-relative ${
        couponActiveStatus ? 'active' : ''
      }`}
    >
      <div className='col-11 text-center d-flex align-items-center justify-content-center '>
        <p className='body-copy body-copy-regular mb-0 text-white py-2'>
          Get 20% off your first purchase,
          <br className='d-lg-none' />
          use code &apos;GET20&apos; at checkout.
        </p>
      </div>
      <div className='col-1 couponModal__close text-white my-auto'>
        <i
          className='fas fa-x '
          onClick={() => setCouponActiveStatus(false)}
        ></i>
      </div>
    </div>
  );
};

export default CouponModal;
