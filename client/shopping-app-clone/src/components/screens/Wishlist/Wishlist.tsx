import { useSelector } from 'react-redux';
import rootReducer from 'reducers';
import ProductCardOne from 'components/common/card/ProductCardOne';
import Footer from 'components/common/footer/Footer';
import JeffLaugh from 'assets/images/jeff_bezzos_laugh.gif';
import 'assets/scss/screens/wishlist.scss';
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
      {productWishList.length ? (
        <div className='d-flex flex-wrap py-2'>
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
      ) : (
        <div className='empty__wishlist  mx-auto padding-default'>
          <div className='position-relative'>
            <img
              src={JeffLaugh}
              alt='jeff-laughing'
              className='jeff__laugh__image empty__cart__gif '
            />
            <p className='empty__wishlist__text position-absolute'>
              Your wishlist is empty
            </p>
          </div>
          <p>Please add some products to your wishlist</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Wishlist;
