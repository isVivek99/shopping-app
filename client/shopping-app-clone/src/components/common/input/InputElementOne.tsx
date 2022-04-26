import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import searchIcon from 'assets/images/search-icon.png';
import dropDownArrow from 'assets/images/ic-chevron-down.png';
import 'assets/scss/common.scss';
import 'assets/scss/common/input/inputElementOne.scss';

interface productArrayElementProps {
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  rating: number;
  id: number;
}
interface InputElementOneprops {
  productArray?: Array<productArrayElementProps>;
  setSearchClickArray: any;
  setSearchString: any;
}

function InputElementOne({
  productArray,
  setSearchClickArray,
  setSearchString,
}: InputElementOneprops) {
  const inputEle = useRef<HTMLInputElement>(document.createElement('input'));
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [showSearchElement, setShowSearchElement] = useState(false);
  const [productArrayLocal, setProductArrayLocal] = useState(
    productArray || [{ pName: '', id: '', img: '' }]
  );

  const setInputHandler = (e: any) => {
    setInput(e.target.value);
  };

  const showSearchElementHandler = () => {
    console.log(input, inputEle.current.value);
    setInput(inputEle.current.value);
    setShowSearchElement(true);
  };
  const removeSearchElementHandler = (e: any) => {
    setShowSearchElement(false);
  };

  const navigateLiHandler = (id: number | string, name: string) => {
    console.log(id, name);
    navigate(`/v1/product/${id}/${name}`);
    inputEle.current.value = name;
  };

  useEffect(() => {
    const newArray = sortElementsByInput();
    setProductArrayLocal(newArray);
    console.log('rerender');
  }, [input]);

  const sortElementsByInput = () => {
    const productArrayLocal = productArray || [];
    return productArrayLocal.filter((product: productArrayElementProps) =>
      product.pName.includes(input)
    );
  };

  const setSearchArrayHandler = () => {
    console.log('click');
    setSearchClickArray(productArrayLocal);
    setSearchString(input);
  };

  useEffect(() => {
    inputEle.current.value = '';
    console.log('rerender2');
  }, []);

  return (
    <div className='w-100'>
      <div className=''>
        <div className='d-lg-flex  justify-content-center col-11 col-xl-8 mx-auto position-relative'>
          <button className=' search__icon__btn ps-3 f-14 bold d-none d-lg-block'>
            <span className='pe-1'>All categories</span>

            <img
              src={dropDownArrow}
              alt=''
              className='img-fluid '
              style={{ height: '16px', width: '16px' }}
            />
          </button>
          <div
            className='col-12 col-lg-8 position-relative'
            style={{ flexGrow: '1' }}
          >
            <div className='vertical__line position-absolute d-none d-lg-block'></div>
            <input
              type='text'
              placeholder='Search Products, categories...'
              className=' input__ele__one col-12 ps-2 ps-lg-5 f-14'
              onChange={(e) => setInputHandler(e)}
              onFocus={showSearchElementHandler}
              onBlur={(e) => removeSearchElementHandler(e)}
              ref={inputEle}
            />
            <img
              src={searchIcon}
              alt=''
              className='img-fluid search__icon'
              style={{ height: '16px' }}
              onClick={setSearchArrayHandler}
            />
          </div>
          <div
            className={`data__result position-absolute w-100 ${
              showSearchElement ? '' : 'd-none'
            }`}
          >
            <ul className='px-0 mb-0 data__result__list'>
              <li className='data__result__products py-2 mt-0 f-12 px-2'>
                PRODUCTS
              </li>
              {input.length
                ? productArrayLocal.map((product) => (
                    <Link
                      key={product.id}
                      to={`/v1/product/${product.id}/${product.pName}`}
                      className='text__link__nohover'
                    >
                      <li
                        className='d-flex data__result__list__element justify-content-start align-items-center px-2 mt-1 mb-3 f-12'
                        onMouseDown={() =>
                          navigateLiHandler(product.id, product.pName)
                        }
                      >
                        <img
                          src={product.img.substring(6)}
                          alt=''
                          className='searchbar__content__section__one__img'
                        />
                        <p className='mb-0 ps-2'>{product.pName}</p>
                      </li>
                    </Link>
                  ))
                : productArrayLocal.slice(2, 7).map((product) => (
                    <Link
                      key={product.id}
                      to={`/v1/product/${product.id}/${product.pName}`}
                      className='text__link__nohover'
                    >
                      <li
                        key={product.id}
                        className='d-flex data__result__list__element justify-content-start align-items-center px-2 mt-1 mb-3 f-12'
                        onMouseDown={() =>
                          navigateLiHandler(product.id, product.pName)
                        }
                      >
                        <img
                          src={product.img.substring(6)}
                          alt=''
                          className='searchbar__content__section__one__img'
                        />
                        <p className='mb-0 ps-2'>{product.pName}</p>
                      </li>
                    </Link>
                  ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InputElementOne;
