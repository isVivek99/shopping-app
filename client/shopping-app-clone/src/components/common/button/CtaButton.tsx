import React from 'react';
import 'assets/scss/common/button/ctaButton.scss';

interface BtnProps {
  text: string;
}
const CtaButton = ({ text }: BtnProps) => {
  return (
    <button className='glow-on-hover' id='testbutton' type='button'>
      <div className='explore_btn'> </div>
      {text}
    </button>
  );
};

export default CtaButton;
