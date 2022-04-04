export const addProducts = (product) => {
  return {
    type: 'ADD_TO_CART',
    payload: { ...product },
  };
};

export const removeProducts = (id) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: { ...id },
  };
};

export const addQuantity = (id) => {
  return {
    type: 'ADD_QUANTITY',
    payload: { ...id },
  };
};

export const subtractQuantity = (id) => {
  return {
    type: 'SUBTRACT_QUANTITY',
    payload: { ...id },
  };
};

export const emptyCart = () => {
  return {
    type: 'EMPTY_CART',
  };
};

export const addToWishlist = (id) => {
  return {
    type: 'ADD_TO_WISHLIST',
    payload: { ...id },
  };
};

export const removeFromWishlist = (id) => {
  return {
    type: 'REMOVE_FROM_WISHLIST',
    payload: { ...id },
  };
};
