import { useSelector } from 'react-redux';
import rootReducer from 'reducers';
import ProductCardOne from 'components/common/card/ProductCardOne';

interface cartProductProps {
  discount?: string;
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  isCart: boolean;
  rating: number;
  id: number;
  quantity: number;
  addedToCart: boolean;
}

const Wishlist = () => {
  type RootStore = ReturnType<typeof rootReducer>;

  const productWishList =
    useSelector((state: RootStore) => state?.reduceWishlist?.wishlist) || [];
  const productCartList =
    useSelector((state: RootStore) => state?.reduceProducts?.myState) || [];

  return (
    <div className='screen'>
      Wishlist
      <div className='d-flex flex-wrap'>
        {productWishList.map((product, index) => (
          <div key={index} className='mx-2 mb-5'>
            <ProductCardOne
              pName={product.pName}
              pDesc={product.pDesc}
              price={product.price}
              img={product.img}
              isCart={true}
              rating={product.rating}
              id={product.id}
              quantity={product.quantity}
              addedToCart={product.addedToCart}
              addedToWishlist={product.addedToWishlist}
              productWishList={productWishList}
              productCartList={productCartList}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
