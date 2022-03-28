import { useState } from 'react';
import 'assets/scss/common/carousels/singleSlideCarousel.scss';
import imgOne from 'assets/images/products/drinks/glucond/glucond-1.webp';
import imgTwo from 'assets/images/products/drinks/glucond/glucond-2.webp';
import imgThree from 'assets/images/products/drinks/glucond/glucond-3.jpeg';

const SingleSlideCarousel = () => {
  const [slideCount, setSlideCount] = useState(4);
  const [currentIndex, setcurrentIndex] = useState(0);
  const next = () => {
    setcurrentIndex((prevState) => prevState + 1);
  };

  const prev = () => {
    setcurrentIndex((prevState) => prevState - 1);
  };
  return (
    <div className='carousel__custom__container'>
      <div className='d-flex carousel__wrapper'>
        <button className='prev__btn' onClick={prev}>
          &lt;
        </button>

        <div
          className='carousel__custom__content d-flex'
          style={{ transform: `translateX(-${currentIndex * 224}px)` }}
        >
          <div className='carousel__custom__content__img px-1'>
            <img
              src={imgOne}
              alt='placeholder'
              className='carousel__custom__content__img'
            />
          </div>
          <div className='carousel__custom__content__img px-1'>
            <img
              src={imgTwo}
              alt='placeholder'
              className='carousel__custom__content__img'
            />
          </div>
          <div className='carousel__custom__content__img px-1'>
            <img
              src={imgThree}
              alt='placeholder'
              className='carousel__custom__content__img'
            />
          </div>
        </div>

        <button className='next__btn' onClick={next}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default SingleSlideCarousel;
