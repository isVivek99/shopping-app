import { useState, useEffect, Key } from 'react';
import 'assets/scss/common/carousels/singleSlideCarousel.scss';

const SingleSlideCarousel = ({ carouselImages }: any) => {
  console.log(carouselImages);
  const [slideCount, setSlideCount] = useState(carouselImages.length);
  const [currentIndex, setcurrentIndex] = useState(0);

  const getCardWidth = () => {
    if (window.innerWidth < 576) {
      return 224;
    }
    return 508;
  };

  useEffect(() => {
    window.addEventListener('resize', getCardWidth);
    return () => window.removeEventListener('resize', getCardWidth);
  }, []);

  const next = () => {
    setcurrentIndex((prevState) => prevState + 1);
  };

  const prev = () => {
    setcurrentIndex((prevState) => prevState - 1);
  };
  return (
    <div className='carousel__custom__container'>
      <div className='d-flex carousel__wrapper'>
        {currentIndex === 0 ? (
          <div></div>
        ) : (
          <button className='prev__btn' onClick={prev}>
            &lt;
          </button>
        )}

        <div
          className='carousel__custom__content d-flex'
          style={{
            transform: `translateX(-${currentIndex * getCardWidth()}px)`,
          }}
        >
          {carouselImages.map((item: string, index: Key | null | undefined) => (
            <div key={index} className='carousel__custom__content__img px-1'>
              <img
                src={require('assets/' + item)}
                alt='single-carousel-img'
                className='carousel__custom__content__img '
              />
            </div>
          ))}
        </div>

        {currentIndex === slideCount - 1 ? (
          <div></div>
        ) : (
          <button className='next__btn' onClick={next}>
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default SingleSlideCarousel;
