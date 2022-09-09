import { CategoryListProducts } from '../models';
import { responseObject } from '../helpers';

const getCategorySubTopicList = async (): Promise<responseObject> => {
  try {
    const subtopicList = await CategoryListProducts.find();
    return { success: true, data: { subtopicList } };
  } catch (err) {
    return { success: false, data: { err }, status: 500 };
  }
};
export default { getCategorySubTopicList };
