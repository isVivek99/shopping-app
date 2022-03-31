import Button from '../button/Button';
import 'assets/scss/common/card/productCardOne.scss';
import Tags from 'components/common/tags/Tags';
import { useDispatch } from 'react-redux';
import { addProducts } from 'actions';
import Rating from 'components/common/rating/Rating';

interface productCardProps {
  discount?: string;
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  isCart: boolean;
  rating: number;
  id: number;
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
}: productCardProps) => {
  const dispatch = useDispatch();
  const productClickHandler = () => {
    dispatch(addProducts({ pName, pDesc, price, img, rating, discount, id }));
  };

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
                  ₹ {calculateDiscount(price)}
                </p>
                <p className='actual__price mb-1'>₹ {price}</p>
              </div>
            ) : (
              <div>
                <p className='discount__price mb-1'>₹ {price}</p>
              </div>
            )}
            <Button
              type={'pri'}
              size={'sml'}
              text={'Buy Now'}
              arrow={'ra'}
              clickHandle={isCart ? productClickHandler : () => null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOne;
