import { Key, useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from 'components/common/card/RecipeCard';
import CategoryProductList from 'components/common/categoryProductList/CategoryProductList';
import Footer from 'components/common/footer/Footer';
import { recipeDetails } from 'utils/recipeDetails';
import axiosInstance from 'services/api';
import 'assets/scss/screens/homepage.scss';
import 'assets/scss/common.scss';

interface categoryList {
  _id: string;
  categoryName: string;
  categorySubTopicList: Array<any>;
  products: Array<any>;
}

function Homepage() {
  const [categoryListDetails, setCategoryListDetails] = useState<
    categoryList | any
  >([]);
  const getCategoryList = async () => {
    try {
      const response = await axiosInstance.get('/api/categorySubTopicList');
      console.log(response.data);

      setCategoryListDetails(response.data.data.subtopicList);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  return (
    <div className='homepage screen'>
      <div className='homepage__components'>
        <div className='mb-3 py-lg-3'>
          {/* recipes */}
          {recipeDetails.map((itr, idx) => (
            <div
              key={idx}
              className='d-flex justify-content-center flex-wrap mb-5'
            >
              {itr['non-veg'].map((recipe, index) => (
                <div key={index}>
                  <RecipeCard
                    heading={recipe.heading}
                    subheading={recipe.subheading}
                    text={recipe.buttonText}
                    img={recipe.img}
                  />
                </div>
              ))}
            </div>
          ))}
          {/* recipes */}
          <div className='mx-auto pt-5'>
            {categoryListDetails.length &&
              categoryListDetails.map(
                (itr: any, ind: Key | null | undefined) => (
                  <div key={ind} className='mt-5 mx-3'>
                    {
                      <CategoryProductList
                        listSubTopicArray={itr['categorySubTopicList']}
                        listHeader={itr['categoryName']}
                        productArray={itr['products']}
                      />
                    }
                  </div>
                )
              )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;
