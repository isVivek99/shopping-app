import { useSelector } from 'react-redux';
import CartProduct from 'components/screens/Checkout/CartProduct';
import rootReducer from 'reducers';
import 'assets/scss/screens/checkout/checkout.scss';
import { calculateDiscount } from 'utils/calculateDiscountPrice';

interface itemProps {
  quantity: number;
  itemPrice: number;
  subtotal: number;
}
const Cart = () => {
  type RootStore = ReturnType<typeof rootReducer>;

  const productCartList =
    useSelector((state: RootStore) => state?.reduceProducts?.myState) || [];

  const productWishList =
    useSelector((state: RootStore) => state?.reduceWishlist?.wishlist) || [];

  console.log(productCartList);

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

  return (
    <div className='screen d-flex mx-auto'>
      <div className='col-12'>
        <div className='d-flex'>
          <div className='col-7'>
            <div className='div1'></div>
          </div>
          <div className='col-5'>
            <div className='cart m-4  px-3'>
              <h2 className='cart__header '>Order Summary</h2>
              <p className='cart__line f-12 mb-1'>
                Price can change depending on shipping method and taxes of your
                state.
              </p>
              <div className='cart__products'>
                {productCartList.map((product, index) => (
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
                ))}
              </div>
              <div className='cart__coupon__code position-relative mx-auto mb-5'>
                <input
                  type='text'
                  placeholder='Apply promo code'
                  className='cart__coupon__input p-2'
                />
                <button className='cart__coupon__btn position-absolute f-16'>
                  Apply now
                </button>
              </div>
              <div className='cart__total__price'>
                <div className='cart__pricing'>
                  <div className='cart__subtotal d-flex justify-content-between'>
                    <h3 className='cart__subtotal__text f-12'>subtotal</h3>
                    <h3 className='cart__subtotal__number f-12'>
                      {' '}
                      ₹ {totalPrice.subtotal.toFixed(2)}
                    </h3>
                  </div>
                  <div className='cart__shipping d-flex justify-content-between'>
                    <h3 className='cart__shipping__text f-12'>shipping</h3>
                    <h3 className='cart__shipping__number f-12'> ₹ 0</h3>
                  </div>
                </div>
                <div className='cart__price__summary d-flex justify-content-between align-items-center my-3'>
                  <div className='cart__total__order d-flex flex-column'>
                    <p className='cart__total__order__text mb-2 f-12'>
                      Total Order
                    </p>
                    <p className='cart__total__order__delivery__date mb-0 color__green f-12'>
                      Guaranteed delivery day: June 12,2020
                    </p>
                  </div>
                  <div className='cart__total__order__price color__green'>
                    <p className='mb-0'> ₹ {totalPrice.subtotal.toFixed(2)}</p>
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
