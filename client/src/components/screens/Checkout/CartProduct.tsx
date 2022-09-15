import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  removeProducts,
  addQuantity,
  subtractQuantity,
  addToWishlist,
  setToast,
} from 'actions';
import Rating from 'components/common/rating/Rating';
import { calculateDiscount } from 'utils/calculateDiscountPrice';

import 'assets/scss/screens/checkout/cartProduct.scss';
import rootReducer from 'redux/reducers';
interface cartProductProps extends CartproductArrayProps {
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
}

interface CartproductArrayProps {
  productCartList?: Array<cartProductProps> | [];
  productWishList?: Array<cartProductProps> | [];
}

const CartProduct = ({
  discount,
  pName,
  pDesc,
  price,
  img,
  rating,
  id,
  quantity,
  addedToCart,
  productWishList,
  productCartList,
}: cartProductProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  type RootStore = ReturnType<typeof rootReducer>;
  const { userDetails, userLoggedIn } =
    useSelector((state: RootStore) => state?.reduceUsers) || {};

  const removeProductClickHandler = (addToWishlist = false) => {
    dispatch(removeProducts({ id }));
    console.log(`removed product from cart !!`, 'success', 'top-right');
    if (!addToWishlist) {
      dispatch(
        setToast({
          message: 'removed product from cart !',
          variant: 'success',
          show: true,
          position: 'top-right',
        })
      );
    }
  };

  const addToWishlistClickHandler = () => {
    if (!userLoggedIn) {
      navigate('../login');
      return;
    }
    const product = productWishList?.filter((iter) => iter.id === id);

    const checkWishlistPresent = product
      ? product.length
        ? false
        : true
      : false;

    if (checkWishlistPresent) {
      dispatch(
        addToWishlist({
          pName,
          pDesc,
          price,
          img,
          rating,
          discount,
          id,
          quantity,
          addedToCart,
        })
      );
      removeProductClickHandler(true);

      dispatch(
        setToast({
          message: `added ${pName} to wishlist !!`,
          variant: 'success',
          show: true,
          position: 'top-right',
        })
      );
    } else {
      console.log('already exist in wishlist', 'error', 'top-right');
    }
  };

  const addProductsClickHandler = () => {
    let filterProduct = productCartList?.filter((item) => item.id === id);
    filterProduct = filterProduct ? filterProduct : [];
    if (filterProduct[0]?.quantity < 5) {
      dispatch(addQuantity({ id }));
    } else {
      console.log('cannot add more than 5', 'error', 'top-right');
    }
  };
  const subtractProductsClickHandler = () => {
    let filterProduct = productCartList?.filter((item) => item.id === id);
    filterProduct = filterProduct ? filterProduct : [];
    if (filterProduct[0].quantity > 1) {
      dispatch(subtractQuantity({ id }));
    } else {
      dispatch(removeProducts({ id }));
    }
  };

  return (
    <div className='cart__product my-2'>
      <div className='cart__content__section__one d-flex'>
        <div className='cart__content__section__one__img__parent '>
          <img
            src={require('assets/' + img)}
            alt=''
            className='cart__content__section__one__img'
          />
        </div>
        <div className='px-2'>
          <h1 className='cart__content__title mb-1'>{pName}</h1>
          <p className='f-12 mb-0'>
            <span className='card__content__item__key f-12 pe-4'>desc:</span>
            <span className='card__content__item__value f-12'>{pDesc}</span>
          </p>
          <div className='cart__rating'>
            <Rating type='static' stars={rating} sizePx={12} />
          </div>
        </div>
      </div>
      <div className='cart__content__section__two d-flex justify-content-between px-1'>
        <div className='cart__content__section__two__part__one'>
          <div
            className='cart__wishlist d-flex mt-2'
            onClick={addToWishlistClickHandler}
          >
            <div className='cart__wishlist__heart '>
              <i className='fas fa-heart mx-2'></i>
            </div>
            <p className='cart__wishlist__text mb-1'>Wishlist</p>
          </div>
          <div
            className='cart__remove d-flex align-items-center'
            onClick={() => removeProductClickHandler(false)}
          >
            <div className='cart__remove__cart'>
              <i className='fas fa-xmark mx-2'></i>
            </div>
            <div>
              <p className='cart__remove__text mb-1'>Remove</p>
            </div>
          </div>
        </div>
        <div className='cart__content__section__two__part__two'>
          <div className='cart__pricing'>
            {discount ? (
              <div className='d-flex flex-column'>
                <p className='cart__discount__price mb-1'>
                  ₹ {calculateDiscount(price, discount)}
                </p>
                <p className='cart__actual__price mb-1'>₹ {price}</p>
              </div>
            ) : (
              <div>
                <p className='cart__discount__price mb-1'>₹ {price}</p>
              </div>
            )}

            <div className='cart__price'></div>
          </div>
        </div>
        <div className='cart__content__section__two__part__three'>
          <div className='cart__quantity'>
            <button
              className='cart__quantity__increment'
              onClick={subtractProductsClickHandler}
            >
              -
            </button>

            <span className='cart__quantity__num'>{quantity}</span>
            <button
              className='cart__quantity__decrement'
              onClick={addProductsClickHandler}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className='my-4 color__gray' />
    </div>
  );
};

export default CartProduct;
