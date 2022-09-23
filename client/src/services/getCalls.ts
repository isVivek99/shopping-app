import axios from 'axios';
import { getListingPageProductList } from 'utils/urls';

export const getListingPageProductListMethod = async () => {
  try {
    const response = await axios.get(getListingPageProductList);
    console.log(response.data);

    return response.data.data.subtopicList;
  } catch (error) {
    console.log(error.message);
  }
};
