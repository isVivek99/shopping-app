/* eslint-disable no-case-declarations */
interface productType {
  id: number;
  pName: string;
  pDesc: string;
  pWeight: string;
  price: number;
  img: string;
  rating: number;
  discount?: string;
}

interface DefaultState {
  myState: Array<productType> | [];
}

const defaultState: DefaultState = {
  myState: [],
};

const reduceProducts = (
  state = defaultState || [],
  action: { type: string; payload: productType }
) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      console.log(action.payload, action, state);
      return { myState: [...state.myState, action.payload] };

    case 'REMOVE_PRODUCT':
      // console.log(state.myState.filter(product=>product.id===action.payload));
      console.log();

      const arr = state.myState.filter(
        (product) => product.id !== action.payload.id
      );
      console.log(arr);

      return { myState: arr };
    default:
      return state;
  }
};
export default reduceProducts;
