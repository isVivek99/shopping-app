import ReactDOM from 'react-dom';
import App from './App';
import 'typeface-poppins';
import 'assets/scss/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from 'redux/reducers';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
