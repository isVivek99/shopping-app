import {
  ChangeEvent,
  useState,
  useRef,
  useEffect,
  SetStateAction,
  Dispatch,
} from 'react';
import Button from 'components/common/button/Button';
import 'assets/scss/common/rangeslider/RangeSlider.scss';

interface SliderProps {
  min: number;
  max: number;
  minGlobal: number;
  maxGlobal: number;
  category: string;
  setMinMaxvalue: Dispatch<SetStateAction<{ min: number; max: number }>>;
}

const RangeSlider = ({
  min,
  max,
  minGlobal,
  maxGlobal,
  category,
  setMinMaxvalue,
}: SliderProps) => {
  const [minVal, setMinVal] = useState(minGlobal);
  const [maxVal, setMaxVal] = useState(maxGlobal);

  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = (value: number) => {
    return Math.round(((value - min) / (max - min)) * 100);
  };

  useEffect(() => {
    setMinMaxvalue({ min: min, max: max });
    setMinVal(min);
    setMaxVal(max);
  }, [category]);

  useEffect(() => {
    const rangeRef = range.current || {
      value: '',
      style: { width: '', left: '' },
    };
    const maxValueRef = maxValRef.current || { value: '' };
    const getMinPerc = getPercent(minVal);
    const getMaxPerc = getPercent(+maxValueRef.value);
    rangeRef.style.left = `${getMinPerc}%`;
    rangeRef.style.width = `${getMaxPerc - getMinPerc}%`;
  }, [minVal, getPercent]);

  useEffect(() => {
    //get max value from ref
    const minValueRef = minValRef.current || { value: '' };
    //get div for range to adjust its width according to the max value
    const rangeRef = range.current || { value: '', style: { width: '' } };
    //calc the width in perc of slider
    const getMinPerc = getPercent(+minValueRef.value);
    const getMaxPerc = getPercent(maxVal);
    //asign value
    rangeRef.style.width = `${getMaxPerc - getMinPerc}%`;
  }, [maxVal, getPercent]);

  const updateMinValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(+e.target.value, maxVal - 100);
    setMinVal(value);
  };

  const updateMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(+e.target.value, minVal + 100);
    setMaxVal(value);
  };

  const setMinMax = () => {
    setMinMaxvalue({ min: minVal, max: maxVal });
  };
  const resetMinMax = () => {
    setMinVal(min);
    setMaxVal(max);
    setMinMaxvalue({ min: min, max: max });
  };

  return (
    <div className='slider__container d-flex justify-content-lg-center justify-content-start px-3'>
      <input
        className={`thumb thumb--zindex-3 ${
          minVal > max - 100 && `thumb--zindex-5`
        }
        `}
        type='range'
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(e) => updateMinValue(e)}
      />

      <input
        className='thumb thumb--zindex-4'
        type='range'
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(e) => updateMaxValue(e)}
      />

      <div className='slider'>
        <div className='slider__track' />
        <div ref={range} className='slider__range' />
        <div className='slider__input__elements position-absloute d-flex justify-content-between'>
          <div className='slider__input__ele__one mt-4 mx-1'>
            <label htmlFor='sip-1'>min</label>
            <input
              readOnly={true}
              name='sip-1'
              type='text'
              className='slider__input__ele__one__text px-3 py-2 f-14'
              placeholder='1'
              value={minVal}
            />
          </div>
          <div className='slider__input__ele__two mt-4 mx-1'>
            <label htmlFor='sip-2'>max</label>
            <input
              readOnly={true}
              name='sip-2'
              type='text'
              className='slider__input__ele__two__text px-3 py-2 f-14'
              placeholder='1000'
              value={maxVal}
            />
          </div>
        </div>
        <div className='slider__apply__reset mt-4 d-flex justify-content-around'>
          <Button
            type={'pri'}
            size={'sml'}
            text={'Apply'}
            clickHandle={setMinMax}
          />
          <button className='slider__reset__btn' onClick={resetMinMax}>
            reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
