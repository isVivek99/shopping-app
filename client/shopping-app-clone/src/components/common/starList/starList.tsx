import { useState, useEffect } from 'react';
import Rating from 'components/common/rating/Rating';
import 'assets/scss/common/starlist/starlist.scss';

interface StarListProps {
  setListingRating: any;
  category: string;
}

const starList = ({ setListingRating, category }: StarListProps) => {
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    setSelected(null);
  }, [category]);

  const setRatingLocal = (e: any) => {
    setSelected(e.target.value);
    setListingRating(e.target.value);
  };
  return (
    <div
      className='d-flex flex-column align-items-start justify-content-center ms-5'
      onClick={(e) => setRatingLocal(e)}
    >
      <div className='d-flex align-items-center'>
        <input
          type='radio'
          className='mx-2'
          id='5-stars'
          value='5'
          checked={selected === '5'}
          readOnly={true}
        />
        <Rating type='static' stars={5} />
      </div>
      <div className='d-flex align-items-center'>
        <input
          type='radio'
          className='mx-2'
          id='4-stars'
          value='4'
          checked={selected === '4'}
          readOnly={true}
        />
        <Rating type='static' stars={4} />
      </div>
      <div className='d-flex align-items-center'>
        <input
          type='radio'
          className='mx-2'
          id='3-stars'
          value='3'
          checked={selected === '3'}
          readOnly={true}
        />
        <Rating type='static' stars={3} />
      </div>
      <div className='d-flex align-items-center'>
        <input
          type='radio'
          className='mx-2'
          id='2-stars'
          value='2'
          checked={selected === '2'}
          readOnly={true}
        />
        <Rating type='static' stars={2} />
      </div>

      <div className='d-flex align-items-center'>
        <input
          type='radio'
          className='mx-2'
          id='1-stars'
          value='1'
          checked={selected === '1'}
          readOnly={true}
        />
        <Rating type='static' stars={1} />
      </div>
    </div>
  );
};

export default starList;
