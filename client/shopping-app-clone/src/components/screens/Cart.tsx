import { useSelector } from 'react-redux';
import ProductCardOne from 'components/common/card/ProductCardOne';
import reduceProducts from 'reducers';
import { Key } from 'react';
const Cart = () => {
  type RootStore = ReturnType<typeof reduceProducts>;
  const productList = useSelector((state: RootStore) => state.myState);

  console.log(productList);

  return (
    <div>
      <div className='d-flex '>
        {productList.map(
          (
            product: {
              pName: string;
              pDesc: string;
              price: number;
              img: string;
            },
            index: Key | null | undefined
          ) => (
            <div key={index} className='m-2'>
              <ProductCardOne
                pName={product.pName}
                pDesc={product.pDesc}
                price={product.price}
                img={product.img}
                isCart={true}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Cart;
