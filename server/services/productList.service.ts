import { ProductList } from '../models';
import { responseObject } from '../helpers';

const getProductList = async (): Promise<responseObject> => {
  try {
    const productList = await ProductList.find();
    return { success: true, data: { productList } };
  } catch (err) {
    return { success: false, data: { err }, status: 500 };
  }
};
export default { getProductList };
