const baseURL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000/api'
    : 'https://shopping-app-beryl.vercel.app/api';

const getCategorySubtopicList = `${baseURL}/categorySubTopicList`;
const getProductList = `${baseURL}/productList`;

export { getCategorySubtopicList, getProductList };
