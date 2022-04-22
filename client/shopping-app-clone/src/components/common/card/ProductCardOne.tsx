import { useState, useEffect } from 'react';
import Button from 'components/common/button/Button';
import 'assets/scss/common/card/productCardOne.scss';
import Tags from 'components/common/tags/Tags';
import { addProducts, removeFromWishlist } from 'actions';
import Rating from 'components/common/rating/Rating';
import { calculateDiscount } from 'utils/calculateDiscountPrice';
import useCustomToast from 'components/common/toast/CustomToast';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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

const ProductCardOne = ({
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
  productCartList,
  productWishList,
  navigateString,
  navigateLink,
}: productCardArrayProps) => {
  const { openToast, ToastComponent } = useCustomToast();

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
  console.log(
    console.log(
      addedToCart
        ? addedToCart && window.location.pathname.substring(1) !== 'wishlist'
          ? 'view'
          : 'add'
        : isInCart && window.location.pathname.substring(1) !== 'wishlist'
        ? 'view'
        : 'add'
    )
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

  // const checkImage = (imgLink: string) => {
  //   console.log(img);
  //   try {
  //     // eslint-disable-next-line @typescript-eslint/no-var-requires
  //     const img = require(imgLink);
  //     console.log(img);

  //     return require(imgLink);
  //   } catch (e: any) {
  //     console.log(e.message);
  //   }
  // };

  const showCartClickHandler = () => {
    navigate(navigateLink || '../cart');
  };

  useEffect(() => {
    checkIfInCart();
    console.log('as');
  }, [productCartList]);

  console.log('rerender');
  return (
    <div>
      <ToastComponent />
      <div>
        <div className='ctn mx-auto cursor-pointer position-relative'>
          <Link to={`/v1/product/${id}/${pName}`} className='text__link'>
            <div className='product__card__image__wrapper position-relative'>
              <img
                className='product__card__image'
                src={require('assets/' + img)}
              />
              {parseInt(discount?.substring(0, 2) || '00%') === 0 ? (
                <span></span>
              ) : (
                <span className='discountTag position-absolute'>
                  <Tags
                    type={'priT'}
                    size={'smlT'}
                    text={discount || ''}
                    close={false}
                  />
                </span>
              )}
            </div>
          </Link>
          <div className='content mt-3'>
            <Link to={`/v1/product/${id}/${pName}`} className='text__link'>
              <div className='details'>
                <span className='title'>{pName}</span>
                <span className='summary'>{pDesc}</span>
                <div className='mb-3'>
                  <Rating type='static' stars={rating} />
                </div>
              </div>
            </Link>
            <div className='buy'>
              {parseInt(discount?.substring(0, 2) || '00%') === 0 ? (
                <div>
                  <p className='discount__price mb-1'>₹ {price}</p>
                </div>
              ) : (
                <div className='d-flex flex-column'>
                  <p className='discount__price mb-1'>
                    ₹ {calculateDiscount(price, discount || '00%')}
                  </p>
                  <p className='actual__price mb-1'>₹ {price}</p>
                </div>
              )}
              {addedToCart ? (
                <div className='action__btn'>
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
              ) : isInCart &&
                window.location.pathname.substring(1) !== 'wishlist' ? (
                <div className='action__btn'>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOne;
