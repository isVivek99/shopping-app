import React, { useState } from 'react';
import 'assets/scss/common/rating/rating.scss';

interface ratingProps {
  type: string;
  stars: number;
}

const Rating = ({ type, stars }: ratingProps) => {
  const [rating, setRating] = useState(stars);
  const [hover, setHover] = useState(0);

  return (
    <div className='star-rating'>
      {[...Array(5)].map((star, index) => {
        index += 1;
        if (type === 'dynamic') {
          return (
            <button
              type='button'
              key={index}
              className={index <= (hover || rating) ? 'on' : 'off'}
              onClick={() => setRating(index)}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              <span className='star'>&#9733;</span>
            </button>
          );
        }
        return (
          <button
            type='button'
            key={index}
            className={index <= rating ? 'on' : 'off'}
          >
            <span className='star'>&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
