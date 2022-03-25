import { useState, useEffect } from 'react';
import ListElementOne from 'components/common/lists/ListElementOne';
import SlideCarousel from 'components/common/carousels/SlideCarousel';
// import ProductCardOne from 'components/common/card/ProductCardOne';

interface CategoryProductListProps {
  listHeader: string | undefined;
  listSubTopicArray: Array<string> | undefined;
  productArray: Array<ObjProp>;
}
interface ObjProp {
  pName: string;
  pDesc: string;
  price: number;
  img: string;
}

const CategoryProductList = ({
  listHeader,
  listSubTopicArray,
  productArray,
}: CategoryProductListProps) => {
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
    <div className='d-flex align-items-center justify-content-center justify-content-lg-around justify-content-md-between  flex-wrap'>
      <div className='me-5'>
        <ListElementOne
          listHeader={listHeader}
          listSubTopicArray={listSubTopicArray}
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
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
