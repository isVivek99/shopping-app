import 'assets/scss/screens/checkout/cartProduct.scss';
import { useDispatch } from 'react-redux';
import { removeProducts } from 'actions';
import Rating from 'components/common/rating/Rating';

interface cartProductProps {
  discount?: string;
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  isCart: boolean;
  rating: number;
  id: number;
}

const CartProduct = ({
  discount,
  pName,
  pDesc,
  price,
  img,
  isCart,
  rating,
  id,
}: cartProductProps) => {
  const dispatch = useDispatch();
  const removeProductClickHandler = () => {
    dispatch(removeProducts({ id }));
  };
  console.log(discount, pName, pDesc, price, img, isCart, rating);

  const calculateDiscount = (price: string | any) => {
    const discountStr = discount?.substring(0, 2);
    if (discountStr !== undefined) {
      const discountNum = parseInt(discountStr);
      const discountedPrice = price * (discountNum / 100);
      return (price - discountedPrice).toFixed(2);
    }
    return null;
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
      <div className='cart__content__section__two d-flex justify-content-between'>
        <div className='cart__content__section__two__part__one'>
          <div className='cart__wishlist d-flex mt-2'>
            <div className='cart__wishlist__heart '>
              <i className='fas fa-heart mx-2'></i>
            </div>
            <p className='cart__wishlist__text mb-1'>Wishlist</p>
          </div>
          <div
            className='cart__remove d-flex align-items-center'
            onClick={removeProductClickHandler}
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
                  ₹ {calculateDiscount(price)}
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
          <button>-</button>
          <button>+</button>
        </div>
      </div>
      <hr className='my-4 color__gray' />
    </div>
  );
};

export default CartProduct;
