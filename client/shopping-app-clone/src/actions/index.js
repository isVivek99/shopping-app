export const addProducts = (product) => {
  return {
    type: 'ADD_PRODUCT',
    payload: { ...product },
  };
};

export const removeProducts = (product) => {
  return {
    type: 'REMOVE_PRODUCT',
    payload: { ...product },
  };
};
