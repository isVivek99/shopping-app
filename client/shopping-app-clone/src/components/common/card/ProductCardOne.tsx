import { useState } from 'react';
import Button from '../button/Button';
import 'assets/scss/common/card/productCardOne.scss';
import Tags from 'components/common/tags/Tags';
import { useDispatch } from 'react-redux';
import { addProducts } from 'actions';
import Rating from 'components/common/rating/Rating';
import { useNavigate } from 'react-router-dom';
import { calculateDiscount } from 'utils/calculateDiscountPrice';
import { removeFromWishlist } from 'actions';
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
  const product = productCartList
    ? productCartList.filter((product) => product.id === id)
    : [];

  const navigate = useNavigate();

  const [showCartBtn, setShowCartBtn] = useState(
    product[0] ? product[0].addedToCart : false
  );
  const dispatch = useDispatch();
  console.log(
    product[0],
    product[0]?.addedToCart,
    product[0]?.addedToWishlist,
    showCartBtn
  );

  const windowLocation = window.location.pathname.substring(1);

  const productClickHandler = () => {
    console.log('click');

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
    setShowCartBtn(true);

    if (product[0]?.addedToWishlist) {
      console.log('delete from wishlist');
      dispatch(removeFromWishlist({ id }));
    }
  };

  const showCartClickHandler = () => {
    navigate(navigateLink || '../cart');
  };

  return (
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
                {product[0]?.addedToCart && windowLocation !== 'wishlist' && (
                  <Button
                    type={'pri'}
                    size={'sml'}
                    text={navigateString || 'View Cart-1'}
                    arrow={'ra'}
                    clickHandle={isCart ? showCartClickHandler : () => null}
                  />
                )}

                {product[0]?.addedToWishlist &&
                  windowLocation === 'wishlist' && (
                    <Button
                      type={'pri'}
                      size={'sml'}
                      text={'Add to Cart-1'}
                      arrow={'ra'}
                      clickHandle={isCart ? productClickHandler : () => null}
                    />
                  )}

                {product[0]?.addedToWishlist &&
                  windowLocation !== 'wishlist' && (
                    <Button
                      type={'pri'}
                      size={'sml'}
                      text={navigateString || 'View Cart-2'}
                      arrow={'ra'}
                      clickHandle={isCart ? showCartClickHandler : () => null}
                    />
                  )}
              </div>
            ) : (
              <Button
                type={'pri'}
                size={'sml'}
                text={'Add to Cart-2'}
                arrow={'ra'}
                clickHandle={isCart ? productClickHandler : () => null}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOne;
