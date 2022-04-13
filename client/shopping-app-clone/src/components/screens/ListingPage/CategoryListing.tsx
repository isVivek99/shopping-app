import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCardOne from 'components/common/card/ProductCardOne';
import ProductCardTwo from 'components/common/card/ProductCardTwo';
import Footer from 'components/common/footer/Footer';
import rootReducer from 'reducers';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPriceRange, setSortFilter, resetFilters } from 'actions';
import RangeSlider from 'components/common/slider/RangeSlider';
import Tags from 'components/common/tags/Tags';
import 'assets/scss/screens/categoryListing.scss';

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
  console.log(minMaxValue);

  const [dropdownStatus, setDropdownStatus] = useState(false);
  const [dropdownValue, setStateDropdownValue] = useState('Recommended');
  const [toggleMobileFilters, setToggleMobileFilters] = useState(false);

  useEffect(() => {
    console.log(minMaxValue, filters);
    dispatch(setPriceRange(minMaxValue));
  }, [minMaxValue]);

  useEffect(() => {
    console.log(filters);
    // dispatch(setPriceRange({ min: filters.minValue, max: filters.maxValue }));
  }, [filters]);

  useEffect(() => {
    console.log(dropdownValue, filters);
    dispatch(setSortFilter(dropdownValue));
  }, [dropdownValue]);

  useEffect(() => {
    return () => {
      console.log('fire');
      setStateDropdownValue('Recommended');
      dispatch(resetFilters());
    };
  }, [category]);

  // filter and sorting functionality
  let newFilteredProductList: any = [];

  const updateFilter = () => {
    const productsCategory = category || 'bakery';

    const productArray =
      productListDetails[0][
        productsCategory as keyof typeof productListDetails[0]
      ];

    const filteredProductList = productArray || [];
    newFilteredProductList = filteredProductList;

    if (filters.maxValue) {
      newFilteredProductList = filteredProductList.filter(
        (product: productCardProps) =>
          product.price > filters.minValue && product.price < filters.maxValue
      );
    }
    if (filters.sortBy !== 'Recommended') {
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
    <div>
      <span className='filter__btn d-flex align-items-center d-lg-none'>
        <i className='fas fa-sliders-h px-2'></i>
        <p className='f-14 text-600 mb-0'>filter</p>
      </span>
      <div className='screen '>
        <div className='f-12 p-3 '>
          <span className='page__path'>Homepage /</span> {category}
        </div>
        <div className='page__name d-flex justify-content-between mx-2 mx-sm-5'>
          <h1 className='page__name__header'>{category}</h1>
          <div className='product__count d-flex align-items-center '>
            <Tags
              type='priT'
              text={newFilteredProductList.length}
              size='smlT'
              close={false}
            />
            <span className='f-12 ps-2 color__gray'>Products</span>
          </div>
        </div>
        <div className='horizontal__filters d-lg-flex justify-content-end my-3'>
          <div className='sort__container position-relative me-lg-3 mx-4'>
            <div
              className={`sort ${dropdownStatus ? 'sort__active' : ''} `}
              onClick={toggleDropdown}
            >
              <span className='sort__by f-12'>Sort by :</span>
              <span className='sort__list__category recommended f-14 pe-5'>
                {dropdownValue}
              </span>
              <span className='down__arrow position-absolute'>
                <i
                  className={`fas fa-angle-down ${
                    dropdownStatus ? 'rotate' : ''
                  }`}
                ></i>
              </span>
            </div>
            {dropdownStatus && (
              <ul
                className='sort__list position-absolute px-0'
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
                    dropdownValue === 'rating'
                      ? 'sort__list__item__active'
                      : 'sort__list__item'
                  }
                >
                  <input
                    type='radio'
                    value='rating'
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
          <div
            className={`col-lg-3 vertical__filters ${
              toggleMobileFilters ? 'vertical__filters__active' : ''
            } `}
          >
            <div className='mt-5'>
              <RangeSlider
                category={category || 'bakery'}
                min={0}
                max={1000}
                setMinMaxvalue={setMinMaxvalue}
                minGlobal={filters.minValue}
                maxGlobal={filters.maxValue}
              />
            </div>
          </div>
          <div className='col-12 col-lg-9'>
            <div className='category__listing__products d-flex flex-wrap justify-content-around'>
              {newFilteredProductList.map(
                (iter: productCardProps, index: string) => (
                  <div key={index}>
                    <div className='m-3 d-block d-sm-none d-lg-block'>
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
                        discount={iter.discount}
                        addedToWishlist={iter.addedToWishlist}
                        productCartList={productCartList}
                        productWishList={productWishList}
                      />
                    </div>
                    <div
                      key={index}
                      className='m-3 d-none d-sm-block d-lg-none'
                    >
                      <ProductCardTwo
                        pName={iter.pName}
                        pDesc={iter.pDesc}
                        price={iter.price}
                        img={iter.img}
                        isCart={true}
                        rating={iter.rating}
                        id={iter.id}
                        quantity={iter.quantity}
                        discount={iter.discount}
                        addedToCart={iter.addedToCart}
                        addedToWishlist={iter.addedToWishlist}
                        productCartList={productCartList}
                        productWishList={productWishList}
                      />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default CategoryListing;
