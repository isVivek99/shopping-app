import { useParams } from 'react-router-dom';
import ProductCardOne from 'components/common/card/ProductCardOne';
import 'assets/scss/common.scss';

interface categoryListingProps {
  productListDetails: Array<object>;
}

interface productCardProps {
  discount?: string;
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  isCart: boolean;
  rating: number;
  id: number;
  quantity: number;
  addedToCart: boolean;
  addedToWishlist: boolean;
}

const CategoryListing = ({ productListDetails }: categoryListingProps) => {
  const { category } = useParams();
  //   const temp: string = category ? category : 'bakery';
  return (
    <div className='screen'>
      <div className='f-12 p-3 '>
        {' '}
        <span className='page__path'>Homepage /</span> {category}
      </div>
      <div className='d-flex mx-auto'>
        <div className='col-3'></div>
        <div className='col-9'>
          <div className='category__listing__products d-flex flex-wrap justify-content-around'>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {productListDetails[0][category].map(
              (iter: productCardProps, index: string) => (
                <div key={index} className='m-3'>
                  <ProductCardOne
                    pName={iter.pName}
                    pDesc={iter.pDesc}
                    price={iter.price}
                    img={iter.img}
                    isCart={false}
                    rating={iter.rating}
                    id={iter.id}
                    quantity={iter.quantity}
                    addedToCart={iter.addedToCart}
                    addedToWishlist={iter.addedToWishlist}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryListing;
