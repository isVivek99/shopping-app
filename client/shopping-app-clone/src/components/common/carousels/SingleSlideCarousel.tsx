import { useState } from 'react';
import 'assets/scss/common/carousels/singleSlideCarousel.scss';

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
          style={{ transform: `translateX(-${currentIndex * 508}px)` }}
        >
          <div className='px-1'>
            <img src='https://via.placeholder.com/500x300' alt='placeholder' />
          </div>
          <div className='px-1'>
            <img src='https://via.placeholder.com/500x300' alt='placeholder' />
          </div>
          <div className='px-1'>
            <img src='https://via.placeholder.com/500x300' alt='placeholder' />
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
