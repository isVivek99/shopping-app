import expressImage from 'assets/images/promises/express-delivery-icon.webp';
import expressOrder from 'assets/images/promises/footer-best-price.webp';
import wideAssortment from 'assets/images/promises/footer-genuine-products.webp';
import rupeeImage from 'assets/images/promises/footer-easy-returns.webp';
import 'assets/scss/screens/product/productPromises.scss';
const ProductFastDelivery = () => {
  return (
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
            Get your order delivered to your doorstep at the earliest from dark
            stores near you.
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
            Cheaper prices than your local supermarket, great cashback offers to
            top it off.
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
            Choose from 5000+ products across food, personal care, household &
            other categories.
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
            Not satisfied with a product? Return it at the doorstep & get a
            refund within hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductFastDelivery;
