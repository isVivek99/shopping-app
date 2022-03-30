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
}

const CategoryListing = ({ productListDetails }: categoryListingProps) => {
  // console.log((productListDetails);
  console.log((productListDetails[0] as any).drinks);

  const { category } = useParams();
  //   const temp: string = category ? category : 'bakery';
  return (
    <div className='screen'>
      CategoryListing: {category}
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
              />
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CategoryListing;
