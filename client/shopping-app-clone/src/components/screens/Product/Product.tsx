import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import rootReducer from 'redux/reducers';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { calculateDiscount } from 'utils/calculateDiscountPrice';
import { addProducts, removeFromWishlist } from 'actions';
import Rating from 'components/common/rating/Rating';
import ListItemsCard from 'components/common/lists/ListItemsCard';
import Button from 'components/common/button/Button';
import SingleSlideCarousel from 'components/common/carousels/SingleSlideCarousel';
import ProductFastDelivery from './ProductFastDelivery';
import Footer from 'components/common/footer/Footer';
import 'assets/scss/screens/product/product.scss';

import { useNavigate } from 'react-router-dom';

interface productCardProps {
  discount?: string;
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  isCart?: boolean;
  rating: number;
  id: number;
  quantity: number;
  addedToCart: boolean;
  addedToWishlist: boolean;
  navigateLink?: string;
  navigateString?: string;
}

interface productCardArrayProps extends productCardProps {
  productCartList?: Array<productCardProps>;
  productWishList?: Array<productCardProps>;
}

const Product = ({ productDetails }: any) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { id, productName } = useParams();
  const productId = id || '1';
  const product = productDetails.find(
    (product: productCardProps) => product.id === parseInt(productId)
  );
  console.log(product);

  //get products from global store
  type RootStore = ReturnType<typeof rootReducer>;
  const productCartList =
    useSelector((state: RootStore) => state?.reduceProducts?.myState) || [];

  const productWishList =
    useSelector((state: RootStore) => state?.reduceWishlist?.wishlist) || [];

  //check if the product lies in the store
  const productFromCart = productCartList
    ? productCartList.filter((item) => item.id === product.id)
    : [];

  const productFromWishlist = productWishList
    ? productWishList.filter((item) => item.id === product.id)
    : [];

  const [productCount, setProductCount] = useState(0);
  const [dropdownStatus, setDropdownStatus] = useState(false);
  const toggleDropdown = () => setDropdownStatus(!dropdownStatus);
  const [isInCart, setIsInCart] = useState(
    productFromCart[0] ? productFromCart[0].addedToCart : false
  );
  const [isInWishlist, setIsInWishlist] = useState(
    productFromWishlist[0] ? productFromWishlist[0].addedToWishlist : false
  );

  const productAddToCartHandler = () => {
    if (window.location.pathname.substring(1) !== 'wishlist') {
      dispatch(addProducts(product));
      setIsInCart(true);
    }

    if (checkIfInWishlist() && checkIfInCart()) {
      console.log('publish error already in cart');
      console.log(
        'product already in cart,please delete to add more',
        'error',
        'top-right'
      );
    } else if (checkIfInWishlist()) {
      console.log('delete from wishlist');
      //product should be deleted only if user is clicking from wishlist page else we just add it to cart
      if (window.location.pathname.substring(1) === 'wishlist') {
        dispatch(addProducts(product));
        dispatch(removeFromWishlist({ id }));
      }
    }
  };

  const showCartClickHandler = () => {
    navigate('../cart');
  };

  const checkIfInCart = () => {
    if (productCartList?.length === 0) return false;
    const cartPoduct = productCartList?.find((item) => item.id === product.id);
    if (cartPoduct) {
      setIsInCart(true);
      return true;
    }
    return false;
  };

  const checkIfInWishlist = () => {
    if (productWishList?.length === 0) return false;
    const wishListPoduct = productWishList?.find(
      (item) => item.id === product.id
    );
    if (wishListPoduct) {
      setIsInWishlist(true);
      return true;
    }
    return false;
  };
  useEffect(() => {
    checkIfInCart();
  }, [productCartList]);

  return (
    <div className='screen '>
      <div className='page__path py-3 ps-3'>
        <p>
          <span>Homepage/</span> <span>{product.category}/ </span>
          {productName}
        </p>
      </div>
      <div className=' d-flex flex-column flex-lg-row mx-auto'>
        <div className='col-lg-6 col-12'>
          <div className='mb-2'>
            <SingleSlideCarousel carouselImages={product.carouselImages} />
          </div>
        </div>
        <div className='col-lg-6 col-12 px-4 px-lg-5'>
          <h1 className='product__page__heading mb-0'>{productName}</h1>

          <div className='mb-4'>
            <Rating type='static' stars={product.rating} />
          </div>
          <div className='mb-5'>
            <p className='product__page__description'>
              Carrots from Tomissy Farm are one of the best on the market.
              Tomisso and his family are giving a full love to his Bio products.
              Tomisso’s carrots are growing on the fields naturally.
            </p>
          </div>
          <div className='d-flex justify-content-around flex-column flex-lg-row justify-content-center mb-5'>
            <div>
              <ListItemsCard category='SKU:' value='76645' color='black' />

              <ListItemsCard
                category='Category:'
                value='Vegetables'
                color='black'
              />
              <ListItemsCard category='Stock' value='In Stock' color='green' />
              <ListItemsCard
                category='Farm:'
                value='Grocery Fields'
                color='black'
              />
            </div>
            <div>
              <ListItemsCard
                category='Freshness:'
                value='1 days old'
                color='black'
              />

              <ListItemsCard category='Unit:' value='kgs' color='black' />
              <ListItemsCard
                category='Delivery:'
                value='in 2 days'
                color='gray'
              />
              <ListItemsCard
                category='Delivery area:'
                value='pune'
                color='black'
              />
            </div>
          </div>
          <div className='product__page__price__box d-flex justify-content-around mx-auto '>
            {product.discount ? (
              <div className='d-flex flex-column'>
                <h1 className='product__page__price__discounted mb-1'>
                  {' '}
                  ₹ {calculateDiscount(product.price, product.discount)}
                </h1>
                <h2 className='product__page__price__original'>₹ 20.49</h2>
              </div>
            ) : (
              <div>
                <p className='product__page__price__undiscounted mb-1'>
                  ₹ {product.price}
                </p>
              </div>
            )}
            <div className='product__page__select__options d-flex align-items-center'>
              <div className='add__to__cart__count me-3 position-relative'>
                <button
                  className='add__to__cart__dropdown__btn d-flex'
                  onClick={toggleDropdown}
                >
                  <span className='color__gray'>{productCount} | </span>
                  <span>
                    <div className='px-1 d-flex align-items-center'>
                      <span className='add__to__cart__unit'>units </span>
                      <div className='angle__down ps-1'>
                        <i className='fas fa-angle-down'></i>
                      </div>
                    </div>
                  </span>
                </button>
                {dropdownStatus && (
                  <div
                    className='add__to__cart__dropdown__btn__content position-absolute w-100'
                    onClick={toggleDropdown}
                  >
                    <div className='dropdown__content '>
                      <p className='mb-0 py-1 ps-2'>1kg</p>
                    </div>
                    <div className='dropdown__content'>
                      <p className='mb-0  py-1 ps-2'>2kg</p>
                    </div>
                    <div className='dropdown__content'>
                      <p className='mb-0  py-1 ps-2'>3kg</p>
                    </div>
                  </div>
                )}
              </div>

              {/* <div className='add__to__cart'>
                <Button
                  type='pri'
                  size='mid'
                  text='+ Add to cart'
                  arrow='none'
                />
              </div> */}
              {isInCart &&
              window.location.pathname.substring(1) !== 'wishlist' ? (
                <div className='action__btn'>
                  {
                    <Button
                      type={'pri'}
                      size={'sml'}
                      text={'View Cart'}
                      arrow={'ra'}
                      clickHandle={showCartClickHandler}
                    />
                  }
                </div>
              ) : (
                <Button
                  type={'pri'}
                  size={'sml'}
                  text={'Add to Cart'}
                  arrow={'ra'}
                  clickHandle={productAddToCartHandler}
                />
              )}
            </div>
          </div>
          <div className='wishlist d-flex mt-4'>
            <div className='wishlist__heart ps-1'>
              <i className='fas fa-heart mx-2'></i>
            </div>
            <p className='wishlist__text'>Add to my wish list</p>
          </div>
          <div className='mt-4'>
            <ProductFastDelivery />
          </div>
        </div>
      </div>
      <div className='mt-5'>
        <Footer />
      </div>
    </div>
  );
};

export default Product;
