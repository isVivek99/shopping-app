export const addProducts = (product) => {
  return {
    type: 'ADD_PRODUCT',
    payload: { ...product },
  };
};
