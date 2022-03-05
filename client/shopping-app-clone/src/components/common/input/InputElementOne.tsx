import React from 'react';
import searchIcon from 'assets/images/search-icon.png';
import dropDownArrow from 'assets/images/ic-chevron-down.png';
import 'assets/scss/common.scss';
import 'assets/scss/common/input/inputElementOne.scss';
function inputElementOne() {
  return (
    <div className='w-100'>
      <div className='d-flex  justify-content-center col-8 col-xl-8 mx-auto'>
        <button className=' search__icon__btn ps-3 f-14'>
          <span className='pe-1'>All categories</span>

          <img
            src={dropDownArrow}
            alt=''
            className='img-fluid '
            style={{ height: '16px', width: '16px' }}
          />
        </button>
        <div className='col-6 col-md-8 position-relative'>
          <div className='vertical__line position-absolute'></div>
          <input
            type='text'
            placeholder='Search Products, categories...'
            className=' input__ele__one col-12 ps-5 f-14'
          />
          <img
            src={searchIcon}
            alt=''
            className='img-fluid search__icon'
            style={{ height: '16px' }}
          />
        </div>
      </div>
    </div>
  );
}

export default inputElementOne;
