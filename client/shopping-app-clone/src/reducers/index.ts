interface productType {
  pName: string;
  pDesc: string;
  pWeight: string;
  price: number;
  img: string;
}

interface DefaultState {
  myState: Array<productType> | [];
}

const defaultState: DefaultState = {
  myState: [],
};

const reduceProducts = (
  state = defaultState,
  action: { type: string; payload: productType }
) => {
  switch (action.type) {
    case 'ADD_PRODUCT':
      console.log(action.payload, action);

      return { myState: [...state.myState, action.payload] };
    default:
      return state;
  }
};
export default reduceProducts;
