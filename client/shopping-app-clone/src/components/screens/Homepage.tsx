import RecipeCard from 'components/common/card/RecipeCard';
import CategoryProductList from 'components/common/categoryProductList/CategoryProductList';
import { recipeDetails } from 'utils/recipeDetails';
import { productDetails } from 'utils/productDetails';
import 'assets/scss/screens/homepage.scss';
function Homepage() {
  return (
    <div className='homepage'>
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
                    onClick={function (): void {
                      throw new Error('Function not implemented.');
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
          {/* recipes */}
          <div className='mx-auto pt-5'>
            {productDetails.map((itr, ind) => (
              <div key={ind} className='my-5'>
                {
                  <CategoryProductList
                    listSubTopicArray={itr['categorySubTopicList']}
                    listHeader={itr['categoryName']}
                    productArray={itr['products']}
                  />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
