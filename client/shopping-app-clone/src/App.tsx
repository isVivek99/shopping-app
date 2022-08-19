import Login from 'components/screens/Login/Login';
import Signup from 'components/screens/Signup/Signup';
import ForgotPassword from 'components/screens/ForgotPassword/ForgotPassword';
import ResetPassword from 'components/screens/ResetPassword/ResetPassword';
import Homepage from './components/screens/Homepage';
import Navbar from 'components/common/navbar/Navbar';
import Checkout from 'components/screens/Checkout/Checkout';
import Product from 'components/screens/Product/Product';
import CategoryProductListing from 'components/screens/ListingPage/CategoryProductListing';
import Wishlist from 'components/screens/Wishlist/Wishlist';
import Suggestions from 'components/screens/Suggestions/Suggestions';
import PageNotFound from 'components/screens/PageNotFound';
import ToastComponent from 'components/common/toast/ToastComponent';
import { categoryListProductDetails } from 'utils/categoryListProductDetails';

import { productDetails } from 'utils/productDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import './assets/scss/App.scss';

function App() {
  const { pathname } = useLocation();

  return (
    <div className='App'>
      <ToastComponent />
      <div
        className='mx-auto navbar__big w-100 position-relative'
        style={{ maxWidth: '1440px', zIndex: '1' }}
      >
        {pathname !== '/login' &&
          pathname !== '/signup' &&
          pathname !== '/forgotPassword' && <Navbar />}
      </div>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/cart' element={<Checkout />} />
        <Route path='/product' element={<Product />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/forgotPassword' element={<ForgotPassword />} />
        <Route
          path='/v1/list/:category'
          element={
            <CategoryProductListing
              categoryListProductDetails={categoryListProductDetails}
            />
          }
        />
        <Route
          path='/v1/suggestions/:searchString'
          element={<Suggestions productDetails={productDetails} />}
        />
        <Route
          path='/v1/product/:id/:productName'
          element={<Product productDetails={productDetails} />}
        />
        <Route
          path='/resetPassword/:email/:token'
          element={<ResetPassword />}
        />

        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
