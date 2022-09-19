import { ListingPageProductList } from '../models';
import { responseObject } from '../helpers';

const getListingPageProductList = async (): Promise<responseObject> => {
  try {
    const subtopicList = await ListingPageProductList.find();
    return { success: true, data: { subtopicList } };
  } catch (err) {
    return { success: false, data: { err }, status: 500 };
  }
};
export default { getListingPageProductList };
