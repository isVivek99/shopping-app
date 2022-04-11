import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCardOne from 'components/common/card/ProductCardOne';
import Footer from 'components/common/footer/Footer';
import rootReducer from 'reducers';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPriceRange, setSortFilter } from 'actions';
import RangeSlider from 'components/common/slider/RangeSlider';
import 'assets/scss/screens/categoryListing.scss';
interface categoryListingProps {
  productListDetails: Array<object>;
}

interface productCardProps {
  discount?: string;
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  isCart: boolean;
  rating: number;
  id: number;
  quantity: number;
  addedToCart: boolean;
  addedToWishlist: boolean;
}

const CategoryListing = ({ productListDetails }: any) => {
  const { category } = useParams();
  const dispatch = useDispatch();

  type RootStore = ReturnType<typeof rootReducer>;
  const filters: any =
    useSelector((state: RootStore) => state?.reduceProducts?.filters) || [];
  // console.log('logfilters:', filters);

  const productCartList =
    useSelector((state: RootStore) => state?.reduceProducts?.myState) || [];

  const productWishList =
    useSelector((state: RootStore) => state?.reduceWishlist?.wishlist) || [];

  const [minMaxValue, setMinMaxvalue] = useState({
    min: filters.minValue,
    max: filters.maxValue,
  });

  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [dropdownValue, setStateDropdownValue] = useState('Recommended');

  useEffect(() => {
    console.log(minMaxValue, filters);
    dispatch(setPriceRange(minMaxValue));
  }, [minMaxValue]);

  useEffect(() => {
    console.log(dropdownValue, filters);
    dispatch(setSortFilter(dropdownValue));
  }, [dropdownValue]);

  let newFilteredProductList;

  const updateFilter = () => {
    const productsCategory = category || 'bakery';

    const productArray =
      productListDetails[0][
        productsCategory as keyof typeof productListDetails[0]
      ];

    const filteredProductList = productArray || [];
    newFilteredProductList = filteredProductList;
    // console.log(newFilteredProductList);

    if (filters.maxValue && filters.minValue) {
      newFilteredProductList = filteredProductList.filter(
        (product: productCardProps) =>
          product.price > filters.minValue && product.price < filters.maxValue
      );
    }
    if (filters.sortBy !== 'Recommended') {
      console.log(filters.sortBy);
      if (filters.sortBy === 'low to high') {
        newFilteredProductList = newFilteredProductList.sort(
          (a: productCardProps, b: productCardProps) => {
            return a.price - b.price;
          }
        );
      }

      if (filters.sortBy === 'high to low') {
        newFilteredProductList = newFilteredProductList.sort(
          (a: productCardProps, b: productCardProps) => {
            return b.price - a.price;
          }
        );
      }

      if (filters.sortBy === 'rating') {
        newFilteredProductList = newFilteredProductList.sort(
          (a: productCardProps, b: productCardProps) => {
            return a.rating - b.rating;
          }
        );
      }
    }
  };
  updateFilter();

  const toggleDropdown = () => setDropdownStatus(!dropdownStatus);
  const setDropdownValue = (e: any) => {
    const value = e.target.lastElementChild?.value;

    if (value) {
      setStateDropdownValue(value);
      toggleDropdown();
      return;
    }
    setStateDropdownValue(e.target.value);
    toggleDropdown();
  };

  return (
    <div className='screen'>
      <div className='f-12 p-3 '>
        <span className='page__path'>Homepage /</span> {category}
      </div>
      <div className='horizontal__filters d-flex justify-content-end'>
        <div className='sort__container position-relative me-3'>
          <div
            className={`sort ${dropdownStatus ? 'sort__active' : ''} `}
            onClick={toggleDropdown}
          >
            <span className='sort__by f-12'>Sort by :</span>
            <span className='sort__list__category recommended f-14 pe-5'>
              {dropdownValue}
            </span>
            <span className={`down__arrow `}>
              <i
                className={`fas fa-angle-down ${
                  dropdownStatus ? 'rotate' : ''
                }`}
              ></i>
            </span>
          </div>
          {dropdownStatus && (
            <ul
              className='sort__list position-absolute  px-0'
              onClick={(e) => setDropdownValue(e)}
            >
              <li
                className={
                  dropdownValue === 'low to high'
                    ? 'sort__list__item__active'
                    : 'sort__list__item'
                }
              >
                <input
                  type='radio'
                  value='low to high'
                  checked={dropdownValue === 'low to high'}
                  readOnly={true}
                />
                low to high
              </li>
              <li
                className={
                  dropdownValue === 'high to low'
                    ? 'sort__list__item__active'
                    : 'sort__list__item'
                }
              >
                <input
                  type='radio'
                  value='high to low'
                  checked={dropdownValue === 'high to low'}
                  readOnly={true}
                />
                high to low
              </li>

              <li
                className={
                  dropdownValue === 'high to low'
                    ? 'sort__list__item__active'
                    : 'sort__list__item'
                }
              >
                <input
                  type='radio'
                  value='Rating'
                  checked={dropdownValue === 'rating'}
                  readOnly={true}
                />
                rating
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className='d-flex mx-auto'>
        <div className='col-3'>
          <div className='mt-5'>
            <RangeSlider
              min={0}
              max={1000}
              setMinMaxvalue={setMinMaxvalue}
              minGlobal={filters.minValue}
              maxGlobal={filters.maxValue}
            />
          </div>
        </div>
        <div className='col-9'>
          <div className='category__listing__products d-flex flex-wrap justify-content-around'>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-ignore */}
            {newFilteredProductList.map(
              (iter: productCardProps, index: string) => (
                <div key={index} className='m-3'>
                  <ProductCardOne
                    pName={iter.pName}
                    pDesc={iter.pDesc}
                    price={iter.price}
                    img={iter.img}
                    isCart={true}
                    rating={iter.rating}
                    id={iter.id}
                    quantity={iter.quantity}
                    addedToCart={iter.addedToCart}
                    addedToWishlist={iter.addedToWishlist}
                    productCartList={productCartList}
                    productWishList={productWishList}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryListing;
