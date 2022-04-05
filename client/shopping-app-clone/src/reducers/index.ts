/* eslint-disable no-case-declarations */
import { combineReducers } from 'redux';

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

interface DefaultState1 {
  myState: Array<productType>;
}
const defaultStateCartItems: DefaultState1 = {
  myState: [],
};

interface DefaultState2 {
  wishlist: Array<productType>;
}
const defaultStateWishlist: DefaultState2 = {
  wishlist: [],
};

const reduceProducts = (
  state = defaultStateCartItems || [],
  action: { type: string; payload: productType }
): DefaultState1 => {
  switch (action.type) {
    case 'ADD_TO_CART':
      console.log(state);
      return {
        myState: [
          ...state.myState,
          { ...action.payload, addedToCart: true, addedToWishlist: false },
        ],
      };

    case 'REMOVE_FROM_CART':
      const arr1 = state.myState.filter(
        (product) => product.id !== action.payload.id
      );
      console.log(arr1);
      return { myState: arr1 };

    case 'ADD_QUANTITY':
      const arr2 = state.myState.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      );
      console.log(arr2);

      return { myState: arr2 };

    case 'SUBTRACT_QUANTITY':
      const arr3 = state.myState.map((product) =>
        product.id === action.payload.id
          ? { ...product, quantity: product.quantity - 1 }
          : product
      );
      console.log(arr3);

      return { myState: arr3 };

    default:
      return state;
  }
};

const reduceWishlist = (
  state = defaultStateWishlist || [],
  action: { type: string; payload: productType }
): DefaultState2 => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      console.log('wishliststate:', state);
      return {
        wishlist: [
          ...state.wishlist,
          { ...action.payload, addedToCart: false, addedToWishlist: true },
        ],
      };

    case 'REMOVE_FROM_WISHLIST':
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

const rootReducer = combineReducers({
  reduceProducts,
  reduceWishlist,
});

export default rootReducer;
export { reduceProducts, reduceWishlist };
