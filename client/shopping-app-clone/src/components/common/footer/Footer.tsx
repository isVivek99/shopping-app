import Tags from 'components/common/tags/Tags';
import 'assets/scss/common/footer/footer.scss';

const ProductTags = [
  'apple',
  'milk',
  'eggs',
  'chicken',
  'apple',
  'milk',
  'eggs',
  'chicken',
  'apple',
  'milk',
  'eggs',
  'chicken',
  'apple',
  'milk',
  'eggs',
  'chicken',
  'apple',
  'milk',
  'eggs',
  'chicken',
  'apple',
  'milk',
  'eggs',
  'chicken',
  'apple',
  'milk',
  'eggs',
  'chicken',
];

const Footer = () => {
  return (
    <div className='ctn-footer  d-flex flex-column justify-content-between  mt-3 mx-auto pt-2'>
      <div className='footer-details d-flex flex-wrap justify-content-between mt-2 px-2'>
        <div className='company'>
          <span className='f-18 pe-3 fw-bold'>Company</span>
          <ul className='footer-company-list p-0 mt-2'>
            <li>
              <a>
                <span className='footer-listItems '>About</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>Carrers</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>Blog</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>Press Releases</span>
              </a>
            </li>
          </ul>
        </div>
        <div className='consumers'>
          <span className='f-18 pe-3 fw-bold'>For Consumers</span>
          <ul className='footer-consumer-list p-0 mt-2'>
            <li>
              <a>
                <span className='footer-listItems'>Your Account</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>Policies</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>Chat with us</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>FAQs</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>Security</span>
              </a>
            </li>
          </ul>
        </div>
        <div className='partners'>
          <span className='f-18 pe-3 fw-bold'>For Partners</span>
          <ul className='footer-partner-list p-0 mt-2'>
            <li>
              <a>
                <span className='footer-listItems'>Become an Affiliate</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>Advertise your product</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>Sell on Market</span>
              </a>
            </li>
            <li>
              <a>
                <span className='footer-listItems'>Deliver</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className='footer-tags d-flex '>
        <div className='f-18 pe-3 fw-bold'>Product Tags</div>
        <span className='footer-tag d-flex pt-2'>
          {ProductTags?.map((item, index) => (
            <span key={index} className='footer-listItems tags'>
              <Tags type='secT' text={item} size='smlT' close={false} />
            </span>
          ))}
        </span>
      </div>
      <div className='footer-social d-flex mt-4'>
        <span className='f-18 pe-3 fw-bold'>Follow us</span>
        <span className='footer-listItems logo'>
          <i className='fab fa-facebook'></i>
        </span>
        <span className='footer-listItems logo'>
          <i className='fab fa-twitter-square'></i>
        </span>
        <span className='footer-listItems logo'>
          <i className='fab fa-instagram'></i>
        </span>
        <span className='footer-listItems logo'>
          <i className='fab fa-youtube'></i>
        </span>
        <span className='footer-listItems logo'>
          <i className='fab fa-linkedin'></i>
        </span>
      </div>
      <div className='footer-copyright my-4 '>
        <span className='footer-copyright-text f-12 '>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy and Content Policies. All trademarks are
          properties of their respective owners. 2016-2022 © Freshness India Pvt
          Ltd. All rights reserved.
        </span>
      </div>
    </div>
  );
};
export default Footer;
