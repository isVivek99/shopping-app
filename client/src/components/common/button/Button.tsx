import React from 'react';
import 'assets/scss/common/button/button.scss';

interface BtnProps {
  type: string;
  size: string;
  text: string;
  arrow?: string;
  width?: string;
  clickHandle?: (e: any) => unknown;
}

const Button = ({
  type,
  size,
  text,
  arrow,
  width = 'auto',
  clickHandle,
}: BtnProps): JSX.Element => {
  return (
    <div>
      <button
        className={`button ${type} ${size} w-${width}`}
        style={{ borderRadius: '12px', fontWeight: '700', fontSize: '15px' }}
        onClick={clickHandle}
      >
        {arrow === 'la' && <i className='fas fa-angle-left'></i>}
        {arrow === 'fav' && <i className='fas fa-heart'></i>}
        <span className='button__text'>{text}</span>
        {arrow === 'ra' && <i className='fas fa-angle-right'></i>}
      </button>
    </div>
  );
};

export default Button;
