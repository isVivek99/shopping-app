import { useEffect, useState } from 'react';
import ProductCardOne from 'components/common/card/ProductCardOne';
import 'assets/scss/common/carousels/slideCarousel.scss';

interface SlideCarouselProps {
  show: number;
  productArray: Array<ObjProp>;
}

interface ObjProp {
  pName: string;
  pDesc: string;
  price: number;
  img: string;
}

const SlideCarousel = ({ show, productArray }: SlideCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(productArray.length);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex(currentIndex + 1);

      return;
    }
    setCurrentIndex(0);
  };
  useEffect(() => {
    console.log(
      currentIndex,
      currentIndex === length - show,
      length,
      show,
      currentIndex === 0
    );
  }, [currentIndex]);

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);

      return;
    }
    setCurrentIndex(length - 1);
  };

  return (
    <div>
      <div className='carousel-container'>
        <div className='carousel-wrapper'>
          {length !== show && currentIndex !== 0 && (
            <button className='left-arrow' onClick={prev}>
              &lt;
            </button>
          )}

          <div className='carousel-content-wrapper'>
            <div
              className={`carousel-content show-${show}`}
              style={{
                transform: `translateX(${currentIndex * (-1136 / 4)}px)`,
              }}
            >
              {productArray?.map((iter, ind) => (
                <div key={ind} className=' my-1'>
                  <ProductCardOne
                    pName={iter.pName}
                    pDesc={iter.pDesc}
                    price={iter.price}
                    img={iter.img}
                    isCart={false}
                  />
                </div>
              ))}
            </div>
          </div>
          {length !== show && currentIndex !== length - show && (
            <button className='right-arrow' onClick={next}>
              &gt;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideCarousel;
