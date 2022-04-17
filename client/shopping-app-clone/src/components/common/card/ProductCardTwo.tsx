import { useState, useEffect } from 'react';
import Button from 'components/common/button/Button';
import ListItemsCard from 'components/common/lists/ListItemsCard';
import Tags from 'components/common/tags/Tags';
import Rating from 'components/common/rating/Rating';
import useCustomToast from 'components/common/toast/CustomToast';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProducts, removeFromWishlist } from 'actions';
import { Link } from 'react-router-dom';
import { calculateDiscount } from 'utils/calculateDiscountPrice';
import 'assets/scss/common/card/productCardTwo.scss';
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

const ProductCardTwo = ({
  discount,
  pName,
  pDesc,
  price,
  img,
  isCart,
  rating,
  id,
  quantity,
  addedToCart,
  addedToWishlist,
  navigateString,
  navigateLink,
  productCartList,
  productWishList,
}: productCardArrayProps) => {
  const propProduct = {
    pName,
    pDesc,
    price,
    img,
    rating,
    discount,
    id,
    quantity,
    addedToCart,
    addedToWishlist,
  };

  const { openToast, ToastComponent } = useCustomToast();

  const productFromCart = productCartList
    ? productCartList.filter((product) => product.id === id)
    : [];

  const productFromWishlist = productWishList
    ? productWishList.filter((product) => product.id === id)
    : [];

  const navigate = useNavigate();

  const [isInCart, setIsInCart] = useState(
    productFromCart[0] ? productFromCart[0].addedToCart : false
  );
  const [isInWishlist, setIsInWishlist] = useState(
    productFromWishlist[0] ? productFromWishlist[0].addedToWishlist : false
  );

  const dispatch = useDispatch();

  const productAddToCartHandler = () => {
    if (window.location.pathname.substring(1) !== 'wishlist') {
      dispatch(addProducts(propProduct));
      setIsInCart(true);
    }

    if (checkIfInWishlist() && checkIfInCart()) {
      console.log('publish error already in cart');
      openToast('product already in cart,please delete to add more', 'error');
    } else if (checkIfInWishlist()) {
      console.log('delete from wishlist');
      //product should be deleted only if user is clicking from wishlist page else we just add it to cart
      if (window.location.pathname.substring(1) === 'wishlist') {
        dispatch(addProducts(propProduct));
        dispatch(removeFromWishlist({ id }));
      }
    }
  };

  const checkIfInCart = () => {
    if (productCartList?.length === 0) return false;
    const cartPoduct = productCartList?.find((product) => product.id === id);
    if (cartPoduct) {
      setIsInCart(true);
      return true;
    }
    return false;
  };

  const checkIfInWishlist = () => {
    if (productWishList?.length === 0) return false;
    const wishListPoduct = productWishList?.find(
      (product) => product.id === id
    );
    if (wishListPoduct) {
      setIsInWishlist(true);
      return true;
    }
    return false;
  };

  const showCartClickHandler = () => {
    navigate(navigateLink || '../cart');
  };

  useEffect(() => {
    checkIfInCart();
  }, [productCartList]);

  return (
    <div>
      <ToastComponent />
      <div className='d-flex flex-column flex-md-row ctn2'>
        <Link to={`/v1/product/${id}/${pName}`} className='text__link'>
          <div className='d-flex '>
            <div className='d-flex card__two__image position-relative'>
              <img
                className='product__card__image2 mx-4'
                src={require('assets/' + img)}
              ></img>
              <span className='discount__tag card__two position-absolute'>
                <Tags
                  type={'priT'}
                  size={'smlT'}
                  text={discount || ''}
                  close={false}
                />
              </span>
            </div>
            <div className='d-flex details2'>
              <span className='f-18 title1'>{pName}</span>
              <span className='f-12 desc'>{pDesc}</span>
              <Rating type='static' stars={rating} />
              <span className='list'>
                <ListItemsCard
                  category='Farm'
                  value='Grocery Tarm Fields'
                  color='gray'
                />
                <ListItemsCard
                  category='Delivery'
                  value='Europe'
                  color='gray'
                />
                <ListItemsCard category='Stock' value='320 pcs' color='green' />
              </span>
            </div>
          </div>
        </Link>
        <div className='d-flex order  flex-row flex-md-column justify-content-around    pe-md-3'>
          <Link to={`/v1/product/${id}/${pName}`} className='text__link '>
            <div className='mx-auto'>
              {discount ? (
                <div className='d-flex flex-column'>
                  <p className='discount__price mb-1'>
                    ₹ {calculateDiscount(price, discount)}
                  </p>
                  <p className='actual__price mb-1'>₹ {price}</p>
                </div>
              ) : (
                <div>
                  <p className='discount__price mb-1'>₹ {price}</p>
                </div>
              )}
              <p className='f-12 shipping mb-1'>Free Shipping</p>
              <p className='f-12 ship-time mb-1'>Delivery in 1 day</p>
            </div>
          </Link>
          <div className=' order-btn my-auto'>
            {isInCart &&
            window.location.pathname.substring(1) !== 'wishlist' ? (
              <div>
                {
                  <Button
                    type={'pri'}
                    size={'sml'}
                    text={navigateString || 'View Cart'}
                    arrow={'ra'}
                    clickHandle={isCart ? showCartClickHandler : () => null}
                  />
                }
              </div>
            ) : (
              <Button
                type={'pri'}
                size={'sml'}
                text={'Add to Cart'}
                arrow={'ra'}
                clickHandle={isCart ? productAddToCartHandler : () => null}
              />
            )}
          </div>
          {/* <span className='mt-2 order-btn'>
            <Button type='sim' size='sml' text='Add to wishlist' arrow='fav' />
          </span> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCardTwo;
