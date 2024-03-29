import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CartProduct from 'components/screens/Checkout/CartProduct';
import rootReducer from 'redux/reducers';
import 'assets/scss/screens/checkout/checkout.scss';
import { calculateDiscount } from 'utils/calculateDiscountPrice';
import { validateCoupon, calculateCouponDiscount } from 'utils/validateCoupon';
import { setCoupon, resetCoupon } from 'actions';
import { getDeliveryDate } from 'utils/getDeliveryDate';
import tenMinuteCeo from 'assets/images/10_min_ceo_2.jpeg';
import ToastComponent from 'components/common/toast/ToastComponent';
import BillingUserInfo from 'components/screens/Checkout/BillingUserInfo';
import Button from 'components/common/button/Button';

interface itemProps {
  quantity: number;
  itemPrice: number;
  subtotal: number;
}

const Cart = () => {
  const dispatch = useDispatch();
  type RootStore = ReturnType<typeof rootReducer>;

  const couponCodeInput: any = useRef(null);
  const couponTTL = 1210000000;

  const productCartList =
    useSelector((state: RootStore) => state?.reduceProducts?.myState) || [];

  const couponObject: any =
    useSelector((state: RootStore) => state?.reduceProducts?.coupon) || {};

  const productWishList =
    useSelector((state: RootStore) => state?.reduceWishlist?.wishlist) || [];

  console.log(productCartList.length);

  const [couponCode, setCouponCode] = useState(couponObject.discountCode);

  const setCouponValue = (e: any) => {
    setCouponCode(e.target.value);
  };
  const clearInputField = () => {
    dispatch(
      resetCoupon({
        applied: false,
        discountCode: '',
        couponType: null,
        valuePercentage: null,
        email: '',
        status: null,
        message: '',
      })
    );
    couponCodeInput.current.value = '';
  };

  useEffect(() => {
    couponCodeInput.current.value = couponObject.discountCode;
  }, []);

  useEffect(() => {
    if (productCartList.length === 0) clearInputField();
  }, [productCartList.length === 0]);

  const validateCouponCode = () => {
    if (productCartList.length) {
      const couponValidation = validateCoupon(couponCode);
      console.log('cpnValidation:', couponValidation);

      dispatch(
        setCoupon({
          applied: couponValidation.status === 200 ? true : false,
          discountCode: couponCode,
          couponType: couponValidation.status === 200 ? 'valid' : 'invalid',
          valuePercentage: couponValidation.status === 200 ? 20 : null,
          email: '',
          ...couponValidation,
        })
      );
      return;
    }
    console.log('add products to cart!', 'error', 'top-right');
  };

  const priceArray = productCartList.map((item) => {
    const quantity = item.quantity;
    const itemPrice = calculateDiscount(
      item.price,
      item.discount ? item.discount : ''
    );
    const subtotal = quantity * itemPrice;
    return { quantity, itemPrice, subtotal };
  });
  console.log(priceArray);

  const totalPrice = priceArray.length
    ? priceArray.reduce((accumulator: itemProps, current: itemProps) => {
        console.log(accumulator, current);
        return {
          quantity: current.quantity,
          itemPrice: current.itemPrice,
          subtotal: accumulator.subtotal + current.subtotal,
        };
      })
    : {
        quantity: 0,
        itemPrice: 0,
        subtotal: 0,
      };
  const discountedTotalPrice: any = couponObject.valuePercentage
    ? calculateCouponDiscount(totalPrice.subtotal, couponObject.valuePercentage)
    : totalPrice.subtotal;

  const ddmmyy = getDeliveryDate();

  return (
    <div className='screen d-flex mx-auto'>
      <div className='col-12'>
        <div className='d-flex flex-column flex-xl-row flex-column-reverse'>
          <div className='col-12 col-xl-7 padding-default'>
            <div className='billing__user__info '>
              <BillingUserInfo />
            </div>
            <div className='mt-3'>
              <Button
                type={'pri'}
                size={'lg'}
                text={'Complete order'}
                clickHandle={() => null}
              />
            </div>
          </div>
          <div className='col-12 col-xl-5 '>
            <div className='cart  my-4  px-3 mx-auto '>
              <h2 className='cart__header '>Order Summary</h2>
              <p className='cart__line f-12 mb-1'>
                Price can change depending on shipping method and taxes of your
                state.
              </p>
              <div className='cart__products'>
                {productCartList.length ? (
                  productCartList.map((product, index) => (
                    <div key={index}>
                      <CartProduct
                        pName={product.pName}
                        pDesc={product.pDesc}
                        price={product.price}
                        img={product.img}
                        isCart={false}
                        rating={product.rating}
                        discount={product.discount}
                        id={product.id}
                        quantity={product.quantity}
                        addedToCart={product.addedToCart}
                        productCartList={productCartList}
                        productWishList={productWishList}
                      />
                    </div>
                  ))
                ) : (
                  <div className='position-relative'>
                    <img
                      src={tenMinuteCeo}
                      alt=''
                      className='empty__cart__image'
                    />
                    <p className='position-absolute empty__cart__text__1 text-600'>
                      ready for a 10 min delivery, which is totally unsafe but
                      we have to do it because, I dont know...
                    </p>
                    <p className='position-absolute empty__cart__text__2 text-600'>
                      Also please add products to cart!
                    </p>
                  </div>
                )}
              </div>
              <div className='cart__coupon__code position-relative mx-auto mb-5'>
                <input
                  ref={couponCodeInput}
                  type='text'
                  placeholder='Apply promo code'
                  className='cart__coupon__input p-2 text-600'
                  onChange={(e) => setCouponValue(e)}
                  disabled={couponObject.applied}
                />
                <div>
                  {couponObject.applied ? (
                    <div className='cart__coupon__btn position-absolute f-16'>
                      <i className='fas fa-x' onClick={clearInputField}></i>
                    </div>
                  ) : (
                    <button
                      className='cart__coupon__btn position-absolute f-16'
                      onClick={validateCouponCode}
                    >
                      Apply now
                    </button>
                  )}
                </div>

                {couponObject.applied ? (
                  <p className='text-success f-12 mb-1'>
                    coupon code applied successfully!
                  </p>
                ) : couponObject.discountCode ? (
                  <p className='text__error f-12 mb-1'>
                    please check your coupon code
                  </p>
                ) : (
                  ''
                )}
              </div>
              <div className='cart__total__price'>
                <div className='cart__pricing'>
                  <div className='cart__subtotal d-flex justify-content-between'>
                    <h3 className='cart__subtotal__text f-12'>subtotal</h3>
                    <h3 className='cart__subtotal__number f-12'>
                      ₹ {totalPrice.subtotal.toFixed(2)}
                    </h3>
                  </div>
                  <div className='cart__shipping d-flex justify-content-between'>
                    <h3 className='cart__shipping__text f-12'>shipping</h3>
                    <h3 className='cart__shipping__number f-12'> ₹ 0</h3>
                  </div>
                  {couponObject.applied ? (
                    <div className='cart__discount d-flex justify-content-between'>
                      <h3 className='cart__discount__text f-12'>discount</h3>

                      <h3 className='cart__discount__number f-12'>
                        ₹ {discountedTotalPrice.totalDiscount.toFixed(2)}
                      </h3>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <div className='cart__price__summary d-flex justify-content-between align-items-center my-3'>
                  <div className='cart__total__order d-flex flex-column'>
                    <p className='cart__total__order__text mb-2 f-12'>
                      Total Order
                    </p>
                    <p
                      className={`cart__total__order__delivery__date mb-0 color__green f-12 ${
                        productCartList.length === 0 ? 'd-none' : ''
                      }`}
                    >
                      Guaranteed delivery day: {ddmmyy}
                    </p>
                  </div>
                  <div className='cart__total__order__price color__green'>
                    {couponObject.applied ? (
                      <p className='mb-0'>
                        ₹{discountedTotalPrice.discountedPrice.toFixed(2)}
                      </p>
                    ) : (
                      <p className='mb-0'>₹ {totalPrice.subtotal.toFixed(2)}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
