import Button from '../button/Button';
import 'assets/scss/common/card/productCardOne.scss';
import Tags from '../tags/Tags';
import { useDispatch } from 'react-redux';
import { addProducts } from 'actions';
interface productCardProps {
  discount?: string;
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  isCart: boolean;
}

const ProductCardOne = ({
  discount,
  pName,
  pDesc,
  price,
  img,
  isCart,
}: productCardProps) => {
  const dispatch = useDispatch();
  const productClickHandler = () => {
    dispatch(addProducts({ pName, pDesc, price, img }));
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
          </div>
          <div className='buy'>
            <span className='price'>₹ {price}</span>
            <Button
              type={'pri'}
              size={'sml'}
              text={'Buy Now'}
              arrow={'ra'}
              clickHandle={isCart ? () => null : productClickHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOne;
