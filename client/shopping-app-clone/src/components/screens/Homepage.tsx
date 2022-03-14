import Navbar from 'components/common/navbar/Navbar';
import RecipeCard from 'components/common/card/RecipeCard';
import CategoryProductList from 'components/common/categoryProductList/CategoryProductList';
import { recipeDetails } from 'utils/recipeDetails';
import 'assets/scss/screens/homepage.scss';
function Homepage() {
  const subTopicArray = [
    'Bakery',
    'Fruit and vegetables',
    'Meat and fish',
    'Drinks',
  ];
  const listHeader = 'Categories';
  return (
    <div className='homepage'>
      <div className='homepage__components'>
        <div className='mb-3 py-lg-3'>
          <Navbar />
          {/* recipes */}
          {recipeDetails.map((itr, idx) => (
            <div key={idx} className='d-flex justify-content-center flex-wrap'>
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
          <div className='mx-auto'>
            <CategoryProductList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
