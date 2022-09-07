import types from 'redux/actionTypes';
export const addProducts = (product: any) => {
  return {
    type: types.ADD_TO_CART,
    payload: { ...product },
  };
};

export const removeProducts = (id: any) => {
  return {
    type: types.REMOVE_FROM_CART,
    payload: { ...id },
  };
};

export const addQuantity = (id: any) => {
  return {
    type: types.ADD_QUANTITY,
    payload: { ...id },
  };
};

export const subtractQuantity = (id: any) => {
  return {
    type: types.SUBTRACT_QUANTITY,
    payload: { ...id },
  };
};

export const emptyCart = () => {
  return {
    type: types.EMPTY_CART,
  };
};

export const addToWishlist = (id: any) => {
  return {
    type: types.ADD_TO_WISHLIST,
    payload: { ...id },
  };
};

export const removeFromWishlist = (id: any) => {
  return {
    type: types.REMOVE_FROM_WISHLIST,
    payload: { ...id },
  };
};
export const setPriceRange = (minMaxObject: any) => {
  return {
    type: types.SET_PRICE_RANGE,
    payload: minMaxObject,
  };
};

export const setRating = (rating: any) => {
  return {
    type: types.SET_RATING,
    payload: { rating },
  };
};

export const setSortFilter = (sortString: any) => {
  return {
    type: types.SET_SORT_FILTER,
    payload: sortString,
  };
};

export const resetFilters = () => {
  return {
    type: types.RESET_SORT_FILTER,
    payload: {
      sortBy: '',
      minValue: 0,
      maxValue: 1000,
      category: '',
      rating: null,
    },
  };
};

//coupon
export const setCoupon = (couponObject: any) => {
  return {
    type: types.ADD_COUPONCODE,
    payload: {
      ...couponObject,
    },
  };
};

export const resetCoupon = (couponObject: any) => {
  return {
    type: types.RESET_COUPONCODE,
    payload: {
      ...couponObject,
    },
  };
};

//toast
export const setToast = (toastInfo: any) => ({
  type: types.SET_TOAST,
  payload: { ...toastInfo, toastId: Math.floor(Math.random() * 100) },
});

export const closeToast = (id: number) => ({
  type: types.CLOSE_TOAST,
  payload: { id },
});

//user login & logout

export const loginUserSuccess = (loggedInUserInfo: any) => ({
  type: types.LOGIN_USER_SUCCESS,
  payload: {
    fName: loggedInUserInfo.fName.fName,
    email: loggedInUserInfo.email.emailAddress,
  },
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
  payload: {},
});

//async actions
export const loginUser = (userInfo: any) => ({
  type: types.LOGIN_USER,
  payload: {
    email: userInfo.email.emailAddress,
    password: userInfo.password.password,
  },
});

export const addUser = (userInfo: any) => ({
  type: types.ADD_USER,
  payload: {
    fName: userInfo.firstName.firstName,
    lName: userInfo.lastName.lastName,
    email: userInfo.email.emailAddress,
    password: userInfo.password.password,
  },
});

export const refreshToken = (accessToken: string) => ({
  type: types.REFRESH_TOKEN,
  payload: { accessToken },
});
