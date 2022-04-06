import { ChangeEvent, useState } from 'react';
import 'assets/scss/common/rangeslider/RangeSlider.scss';

const RangeSlider = () => {
  const [value, setValue] = useState(1);
  const updateValueHandler = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(parseInt(e.target.value));

  return (
    <div className='slider__parent'>
      <input
        type='range'
        min='1'
        max='500'
        value={value}
        onChange={(e) => updateValueHandler(e)}
      />
      <div className='bubble position-absolute'></div>
    </div>
  );
};

export default RangeSlider;
