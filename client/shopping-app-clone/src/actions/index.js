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
export const setPriceRange = (minMaxObject) => {
  return {
    type: 'SET_PRICE_RANGE',
    payload: minMaxObject,
  };
};

export const setRating = (rating) => {
  return {
    type: 'SET_RATING',
    payload: { rating },
  };
};

export const setSortFilter = (sortString) => {
  return {
    type: 'SET_SORT_FILTER',
    payload: sortString,
  };
};

export const resetFilters = () => {
  return {
    type: 'RESET_SORT_FILTER',
    payload: {
      sortBy: '',
      minValue: 0,
      maxValue: 1000,
      category: '',
      rating: null,
    },
  };
};

export const setCoupon = (couponObject) => {
  return {
    type: 'ADD_COUPONCODE',
    payload: {
      ...couponObject,
    },
  };
};

export const resetCoupon = (couponObject) => {
  return {
    type: 'RESET_COUPONCODE',
    payload: {
      ...couponObject,
    },
  };
};
