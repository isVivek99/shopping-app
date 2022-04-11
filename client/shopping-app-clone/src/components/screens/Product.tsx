import { useState } from 'react';
import Rating from 'components/common/rating/Rating';
import ListItemsCard from 'components/common/lists/ListItemsCard';
import Button from 'components/common/button/Button';
import SingleSlideCarousel from 'components/common/carousels/SingleSlideCarousel';
import expressImage from 'assets/images/promises/express-delivery-icon.webp';
import expressOrder from 'assets/images/promises/footer-best-price.webp';
import wideAssortment from 'assets/images/promises/footer-genuine-products.webp';
import rupeeImage from 'assets/images/promises/footer-easy-returns.webp';
import 'assets/scss/common.scss';
import 'assets/scss/screens/product.scss';

const Product = () => {
  const [productCount, setProductCount] = useState(0);
  const [dropdownStatus, setDropdownStatus] = useState(false);

  const toggleDropdown = () => setDropdownStatus(!dropdownStatus);
  return (
    <div className='productpage'>
      <div className='page__path py-3 ps-3'>
        <p>Homepage/Fruit and vegetables/Carrots from Tomissy Farm</p>
      </div>
      <div className=' d-flex flex-column flex-lg-row mx-auto'>
        <div className='col-lg-6 col-12'>
          <div className='mb-2'>
            <SingleSlideCarousel />
          </div>
        </div>
        <div className='col-lg-6 col-12 px-4 px-lg-5'>
          <h1 className='product__page__heading mb-0'>
            Carrots from Tomissy Farm
          </h1>

          <div className='mb-4'>
            <Rating type='static' stars={4} />
          </div>
          <div className='mb-5'>
            <p className='product__page__description'>
              Carrots from Tomissy Farm are one of the best on the market.
              Tomisso and his family are giving a full love to his Bio products.
              Tomisso’s carrots are growing on the fields naturally.
            </p>
          </div>
          <div className='d-flex justify-content-around flex-column flex-lg-row justify-content-center mb-5'>
            <div>
              <ListItemsCard category='SKU:' value='76645' color='black' />

              <ListItemsCard
                category='Category:'
                value='Vegetables'
                color='black'
              />
              <ListItemsCard category='Stock' value='In Stock' color='green' />
              <ListItemsCard
                category='Farm:'
                value='Grocery Fields'
                color='black'
              />
            </div>
            <div>
              <ListItemsCard
                category='Freshness:'
                value='1 days old'
                color='black'
              />

              <ListItemsCard category='Unit:' value='kgs' color='black' />
              <ListItemsCard
                category='Delivery:'
                value='in 2 days'
                color='gray'
              />
              <ListItemsCard
                category='Delivery area:'
                value='pune'
                color='black'
              />
            </div>
          </div>
          <div className='product__page__price__box d-flex justify-content-around mx-auto '>
            <div className='product__page__price'>
              <h1 className='product__page__price__discounted mb-1'>₹ 14.49</h1>
              <h2 className='product__page__price__original'>₹ 20.49</h2>
            </div>
            <div className='product__page__select__options d-flex align-items-center'>
              <div className='add__to__cart__count me-3 position-relative'>
                <button
                  className='add__to__cart__dropdown__btn d-flex'
                  onClick={toggleDropdown}
                >
                  <span className='color__gray'>{productCount} | </span>
                  <span>
                    <div className='px-1 d-flex align-items-center'>
                      <span className='add__to__cart__unit'>units </span>
                      <div className='angle__down ps-1'>
                        <i className='fas fa-angle-down'></i>
                      </div>
                    </div>
                  </span>
                </button>
                {dropdownStatus && (
                  <div
                    className='add__to__cart__dropdown__btn__content position-absolute w-100'
                    onClick={toggleDropdown}
                  >
                    <div className='dropdown__content '>
                      <p className='mb-0 py-1 ps-2'>1kg</p>
                    </div>
                    <div className='dropdown__content'>
                      <p className='mb-0  py-1 ps-2'>2kg</p>
                    </div>
                    <div className='dropdown__content'>
                      <p className='mb-0  py-1 ps-2'>3kg</p>
                    </div>
                  </div>
                )}
              </div>

              <div className='add__to__cart'>
                <Button
                  type='pri'
                  size='mid'
                  text='+ Add to cart'
                  arrow='none'
                />
              </div>
            </div>
          </div>
          <div className='wishlist d-flex mt-4'>
            <div className='wishlist__heart ps-1'>
              <i className='fas fa-heart mx-2'></i>
            </div>
            <p className='wishlist__text'>Add to my wish list</p>
          </div>
          <div className='product__promises__section mb-3'>
            <div className='promises__header'>Why shop from freshness?</div>
            <div className='promises__container d-grid my-3'>
              <div className='promises__container__img__div pe-2'>
                <img
                  src={expressImage}
                  alt='express delivery'
                  className='img-fluid promises__container__img'
                />
              </div>
              <div className='promises__container__content'>
                <p className='promises__container__content__line__one mb-1 f-12'>
                  10 minute grocery now
                </p>
                <p className='promises__container__content__line__two mb-0 f-12'>
                  Get your order delivered to your doorstep at the earliest from
                  dark stores near you.
                </p>
              </div>
            </div>
            <div className='promises__container d-grid my-3'>
              <div className='promises__container__img__div pe-2'>
                <img
                  src={expressOrder}
                  alt='express delivery'
                  className='img-fluid promises__container__img'
                />
              </div>
              <div className='promises__container__content'>
                <p className='promises__container__content__line__one mb-1 f-12'>
                  Best Prices & Offers
                </p>
                <p className='promises__container__content__line__two mb-0 f-12'>
                  Cheaper prices than your local supermarket, great cashback
                  offers to top it off.
                </p>
              </div>
            </div>
            <div className='promises__container d-grid my-3'>
              <div className='promises__container__img__div pe-2'>
                <img
                  src={wideAssortment}
                  alt='express delivery'
                  className='img-fluid promises__container__img'
                />
              </div>
              <div className='promises__container__content'>
                <p className='promises__container__content__line__one mb-1 f-12'>
                  Wide Assortment
                </p>
                <p className='promises__container__content__line__two mb-0 f-12'>
                  Choose from 5000+ products across food, personal care,
                  household & other categories.
                </p>
              </div>
            </div>
            <div className='promises__container d-grid my-3'>
              <div className='promises__container__img__div pe-2'>
                <img
                  src={rupeeImage}
                  alt='express delivery'
                  className='img-fluid promises__container__img'
                />
              </div>
              <div className='promises__container__content'>
                <p className='promises__container__content__line__one mb-0 f-12'>
                  Easy Returns
                </p>
                <p className='promises__container__content__line__two mb-0 f-12'>
                  Not satisfied with a product? Return it at the doorstep & get
                  a refund within hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
