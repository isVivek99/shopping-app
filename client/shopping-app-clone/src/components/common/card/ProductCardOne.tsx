import { useState, useEffect } from 'react';
import Button from '../button/Button';
import 'assets/scss/common/card/productCardOne.scss';
import Tags from 'components/common/tags/Tags';
import { useDispatch } from 'react-redux';
import { addProducts } from 'actions';
import Rating from 'components/common/rating/Rating';
import { useNavigate } from 'react-router-dom';
import { calculateDiscount } from 'utils/calculateDiscountPrice';
import { removeFromWishlist } from 'actions';
import useCustomToast from 'components/common/toast/CustomToast';

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

  const productFromCart = productCartList
    ? productCartList.filter((product) => product.id === id)
    : [];

  const productFromWishlist = productWishList
    ? productWishList.filter((product) => product.id === id)
    : [];

  const navigate = useNavigate();

  const [showCartBtn, setShowCartBtn] = useState(
    productFromCart[0] ? productFromCart[0].addedToCart : false
  );
  const dispatch = useDispatch();
  console.log(productFromCart[0], showCartBtn, productWishList);

  const productClickHandler = () => {
    console.log('click');

    if (productFromCart[0]?.id !== productFromWishlist[0]?.id) {
      dispatch(
        addProducts({
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
        })
      );
    }
    setShowCartBtn(true);

    if (
      productFromWishlist[0]?.addedToWishlist &&
      !productFromCart[0]?.addedToCart &&
      window.location.pathname.substring(1) !== ''
    ) {
      console.log('delete from wishlist');
      dispatch(removeFromWishlist({ id }));
    }
    console.log(productFromCart[0]?.id, productFromWishlist[0]?.id);

    if (productFromCart[0]?.id === productFromWishlist[0]?.id) {
      console.log(productFromCart[0]?.id === productFromWishlist[0]?.id);
      openToast('already exist in cart', 'error');
    }
  };

  const showCartClickHandler = () => {
    navigate(navigateLink || '../cart');
  };

  return (
    <div>
      <ToastComponent />
      <div>
        <div className='ctn mx-auto'>
          <div className='product__card__image__wrapper position-relative'>
            <img
              className='product__card__image'
              src={require('assets/' + img)}
            />
            <span className='discountTag position-absolute'>
              <Tags
                type={'priT'}
                size={'smlT'}
                text={discount || ''}
                close={false}
              />
            </span>
          </div>
          <div className='content mt-3'>
            <div className='details'>
              <span className='title'>{pName}</span>
              <span className='summary'>{pDesc}</span>
              <p>
                <Rating type='static' stars={rating} />
              </p>
            </div>
            <div className='buy'>
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
              {showCartBtn ? (
                <div>
                  {productFromCart[0]?.addedToCart &&
                    window.location.pathname.substring(1) === '' && (
                      <Button
                        type={'pri'}
                        size={'sml'}
                        text={navigateString || 'View Cart'}
                        arrow={'ra'}
                        clickHandle={isCart ? showCartClickHandler : () => null}
                      />
                    )}

                  {productFromCart[0]?.addedToCart &&
                    window.location.pathname.substring(1) !== '' && (
                      <Button
                        type={'pri'}
                        size={'sml'}
                        text={'Add to Cart'}
                        arrow={'ra'}
                        clickHandle={isCart ? productClickHandler : () => null}
                      />
                    )}
                </div>
              ) : (
                <Button
                  type={'pri'}
                  size={'sml'}
                  text={'Add to Cart'}
                  arrow={'ra'}
                  clickHandle={isCart ? productClickHandler : () => null}
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
