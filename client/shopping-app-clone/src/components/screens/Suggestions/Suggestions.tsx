import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import rootReducer from 'reducers';
import ProductCardOne from 'components/common/card/ProductCardOne';
import ProductCardTwo from 'components/common/card/ProductCardTwo';

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
}

interface SuggestionsProps {
  productDetails?: Array<productCardProps>;
}

const Suggestions = ({ productDetails }: SuggestionsProps) => {
  const navigate = useNavigate();
  const { searchString } = useParams();
  console.log(searchString);

  type RootStore = ReturnType<typeof rootReducer>;

  const productCartList =
    useSelector((state: RootStore) => state?.reduceProducts?.myState) || [];

  const productWishList =
    useSelector((state: RootStore) => state?.reduceWishlist?.wishlist) || [];

  const [localArray, setlocalArray] = useState(
    productDetails || [{ pName: '', id: '', img: '' }]
  );

  useEffect(() => {
    const newProductsArray = sortElementsByInput();
    const findProductInCart = findProductInCartMethod(newProductsArray);
    console.log(newProductsArray, productCartList);

    if (findProductInCart.length) {
      setlocalArray(findProductInCart);
      return;
    }
    navigate('../*');
  }, []);

  const findProductInCartMethod = (
    newProductsArray: Array<productCardProps>
  ) => {
    const arr = [...newProductsArray];
    newProductsArray.forEach((item, index) => {
      productCartList.forEach((cartItem) => {
        if (item.pName === cartItem.pName) {
          arr[index] = cartItem;
        }
      });
    });
    return arr;
  };

  const sortElementsByInput = () => {
    const productArrayLocal = productDetails || [];
    return productArrayLocal.filter((product: productCardProps) =>
      product.pName.includes(searchString || 'eggs')
    );
  };

  return (
    <div>
      <div className='screen'>
        <div className='padding-default'>
          <p className=''>Suggestions ({localArray.length})</p>
          <div className='category__listing__products d-flex flex-wrap justify-content-around'>
            {localArray.map((iter: any, index) => (
              <div className='m-3 d-block d-sm-none d-lg-block' key={index}>
                <ProductCardOne
                  pName={iter.pName}
                  pDesc={iter.pDesc}
                  price={iter.price}
                  img={iter.img}
                  isCart={true}
                  rating={iter.rating}
                  id={iter.id}
                  quantity={iter.quantity}
                  addedToCart={iter.addedToCart}
                  discount={iter.discount}
                  addedToWishlist={iter.addedToWishlist}
                  productCartList={productCartList}
                  productWishList={productWishList}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
