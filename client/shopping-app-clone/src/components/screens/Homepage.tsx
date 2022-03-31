import RecipeCard from "components/common/card/RecipeCard";
import CategoryProductList from "components/common/categoryProductList/CategoryProductList";
import { recipeDetails } from "utils/recipeDetails";
import { categoryListDetails } from "utils/categoryListDetails";
import "assets/scss/screens/homepage.scss";
import "assets/scss/common.scss";
function Homepage() {
  return (
    <div className="homepage screen">
      <div className="homepage__components">
        <div className="mb-3 py-lg-3">
          {/* recipes */}
          {recipeDetails.map((itr, idx) => (
            <div
              key={idx}
              className="d-flex justify-content-center flex-wrap mb-5"
            >
              {itr["non-veg"].map((recipe, index) => (
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
          <div className="mx-auto pt-5">
            {categoryListDetails.map((itr, ind) => (
              <div key={ind} className="mt-5 mx-3">
                {
                  <CategoryProductList
                    listSubTopicArray={itr["categorySubTopicList"]}
                    listHeader={itr["categoryName"]}
                    productArray={itr["products"]}
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
