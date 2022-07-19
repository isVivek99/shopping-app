/* eslint-disable no-case-declarations */
import reduceUsers from 'redux/reducers/reduceUsers';
import types from 'redux/actionTypes';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { watcherSaga } from '../sagas/rootSaga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

interface productType {
  id: number;
  pName: string;
  pDesc: string;
  pWeight: string;
  price: number;
  img: string;
  rating: number;
  discount?: string;
  quantity: number;
  addedToCart: boolean;
  addedToWishlist: boolean;
}
interface filters {
  sortBy: string;
  min: number;
  max: number;
  category: string;
  rating: number;
}
interface coupon {
  applied: boolean;
  discountCode: string;
  couponType: string;
  valuePercentage: number;
  email: string;
  status: number;
  message: string;
}

interface DefaultState1 {
  myState: Array<productType>;
  filters?: object;
  coupon?: object;
}
const defaultStateCartItems: DefaultState1 = {
  myState: [],
  filters: {
    sortBy: '',
    minValue: 0,
    maxValue: 1000,
    category: '',
    rating: 0,
  },
  coupon: {
    applied: false,
    discountCode: '',
    couponType: null,
    valuePercentage: null,
    email: '',
    status: null,
    message: '',
  },
};

interface DefaultState2 {
  wishlist: Array<productType>;
}
const defaultStateWishlist: DefaultState2 = {
  wishlist: [],
};

const reduceProducts = (
  state = defaultStateCartItems || [],
  action: { type: string; payload: productType & filters & coupon }
): DefaultState1 => {
  switch (action.type) {
    case types.ADD_TO_CART:
      console.log(state);
      return {
        myState: [
          ...state.myState,
          { ...action.payload, addedToCart: true, addedToWishlist: false },
        ],
        filters: {
          ...state.filters,
        },
        coupon: {
          ...state.coupon,
        },
      };

    case types.REMOVE_FROM_CART:
      const arr1 = state.myState.filter(
        (product) => product.id !== action.payload.id
      );
      console.log(arr1);
      return {
        myState: arr1,
        filters: {
          ...state.filters,
        },
        coupon: {
          ...state.coupon,
        },
      };

    case types.ADD_QUANTITY:
      const arr2 = state.myState.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      console.log(arr2);

      return {
        myState: arr2,
        filters: {
          ...state.filters,
        },
        coupon: {
          ...state.coupon,
        },
      };

    case types.SUBTRACT_QUANTITY:
      const arr3 = state.myState.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      console.log(arr3);

      return {
        myState: arr3,
        filters: {
          ...state.filters,
        },
        coupon: {
          ...state.coupon,
        },
      };

    case types.SET_PRICE_RANGE:
      return {
        myState: [...state.myState],
        filters: {
          ...state.filters,
          minValue: action.payload.min,
          maxValue: action.payload.max,
        },
        coupon: {
          ...state.coupon,
        },
      };

    case types.SET_RATING:
      console.log(action.payload, 'here');

      return {
        myState: [...state.myState],
        filters: {
          ...state.filters,
          rating: action.payload.rating,
        },
        coupon: {
          ...state.coupon,
        },
      };

    case types.SET_SORT_FILTER:
      return {
        myState: [...state.myState],
        filters: {
          ...state.filters,
          sortBy: action.payload,
        },
        coupon: {
          ...state.coupon,
        },
      };

    case types.RESET_SORT_FILTER:
      return {
        myState: [...state.myState],
        filters: {
          ...action.payload,
        },
        coupon: {
          ...state.coupon,
        },
      };

    case types.ADD_COUPONCODE:
      console.log(action.payload);

      return {
        myState: [...state.myState],
        filters: {
          ...state.filters,
        },
        coupon: {
          ...action.payload,
        },
      };

    case types.RESET_COUPONCODE:
      return {
        myState: [...state.myState],
        filters: {
          ...state.filters,
        },
        coupon: {
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

const reduceWishlist = (
  state = defaultStateWishlist || [],
  action: { type: string; payload: productType }
): DefaultState2 => {
  switch (action.type) {
    case types.ADD_TO_WISHLIST:
      console.log('wishliststate:', state);
      return {
        wishlist: [
          ...state.wishlist,
          { ...action.payload, addedToCart: false, addedToWishlist: true },
        ],
      };

    case types.REMOVE_FROM_WISHLIST:
      console.log('wishliststate:', state);
      const arr1 = state.wishlist.filter(
        (product) => product.id !== action.payload.id
      );
      console.log('newwishList:', arr1);
      return {
        wishlist: [...arr1],
      };
    default:
      return state;
  }
};

//rootreducer
const rootReducer = combineReducers({
  reduceProducts,
  reduceWishlist,
  reduceUsers,
});
export default rootReducer;
export { reduceProducts, reduceWishlist };

//saga-middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
const enhancer = applyMiddleware(...middleware);

//store
const persistConfig = {
  key: 'persist-key',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(enhancer)
);
sagaMiddleware.run(watcherSaga);
export const persistor = persistStore(store);
