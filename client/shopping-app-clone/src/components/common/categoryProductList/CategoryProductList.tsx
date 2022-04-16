import { useState, useEffect } from 'react';
import ListElementOne from 'components/common/lists/ListElementOne';
import SlideCarousel from 'components/common/carousels/SlideCarousel';

interface objType {
  pName: string;
  id: number;
}
interface CategoryProductListProps {
  listHeader: string | undefined;
  listSubTopicArray: unknown;
  productArray: Array<ObjProp>;
}

interface ObjProp {
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  rating: number;
  id: number;
  quantity: number;
  addedToCart: boolean;
  addedToWishlist: boolean;
}

const CategoryProductList = ({
  listHeader,
  listSubTopicArray,
  productArray,
}: CategoryProductListProps) => {
  console.log('pAray:', productArray);

  const [desktopWidth, setDesktopWidth] = useState(window.innerWidth);

  const updateMedia = () => {
    setDesktopWidth(window.innerWidth);
  };

  const getCardCount = () => {
    if (desktopWidth >= 1399) {
      return 4;
    } else if (desktopWidth >= 1200) {
      return 3;
    } else if (desktopWidth >= 1150) {
      return 2;
    } else if (desktopWidth >= 839) {
      return 2;
    } else {
      return 1;
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);
  return (
    <div className='d-flex align-items-start justify-content-center justify-content-lg-around justify-content-md-between  flex-wrap'>
      <div className='me-5 mt-3'>
        <ListElementOne
          listHeader={listHeader}
          listSubTopicArray={listSubTopicArray}
        />
      </div>
      <div className='d-flex flex-wrap'>
        <div className=''>
          <SlideCarousel show={getCardCount()} productArray={productArray} />
        </div>
      </div>
    </div>
  );
};

export default CategoryProductList;
