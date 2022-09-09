import React from 'react';
import 'assets/scss/common/button/ctaButton.scss';

interface BtnProps {
  text: string;
}
const CtaButton = ({ text }: BtnProps) => {
  return (
    <button className='glowing-button' type='button'>
      {text}
    </button>
  );
};

export default CtaButton;
