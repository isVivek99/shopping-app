import './assets/scss/App.scss';
import Homepage from './components/screens/Homepage';
import Navbar from 'components/common/navbar/Navbar';
import Cart from 'components/screens/Cart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <div
          className='mx-auto navbar__big w-100 position-relative'
          style={{ maxWidth: '1440px', zIndex: '1' }}
        >
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
