import { useSelector } from 'react-redux';
import CartProduct from 'components/screens/Checkout/CartProduct';
import reduceProducts from 'reducers';
import 'assets/scss/screens/checkout/checkout.scss';

const Cart = () => {
  type RootStore = ReturnType<typeof reduceProducts>;
  const productList = useSelector((state: RootStore) => state?.myState) || [];
  console.log(productList);

  return (
    <div className='screen d-flex mx-auto'>
      <div className='col-12'>
        <div className='d-flex'>
          <div className='col-7'></div>
          <div className='col-5'>
            <div className='cart m-4  px-3'>
              <h2 className='cart__header '>Order Summary</h2>
              <p className='cart__line f-12 mb-1'>
                Price can change depending on shipping method and taxes of your
                state.
              </p>
              {productList.map((product, index) => (
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
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
