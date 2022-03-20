import Navbar from "components/common/navbar/Navbar";
import RecipeCard from "components/common/card/RecipeCard";
import CategoryProductList from "components/common/categoryProductList/CategoryProductList";
import { recipeDetails } from "utils/recipeDetails";
import { productDetails } from "utils/productDetails";
import "assets/scss/screens/homepage.scss";
import ProductCardTwo from "components/common/card/ProductCardTwo";

function Homepage() {
  const subTopicArray = [
    "Bakery",
    "Fruit and vegetables",
    "Meat and fish",
    "Drinks",
  ];

  return (
    <div className="homepage">
      <div className="homepage__components">
        <div className="mb-3 py-lg-3">
          <Navbar />
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
            {productDetails.map((itr, ind) => (
              <div key={ind}>
                {itr["categories"].map((category, index) => (
                  <div key={index}>
                    {category["Best selling products"] && (
                      <CategoryProductList
                        listSubTopicArray={
                          category["Best selling products"]?.subtopicList
                        }
                        listHeader="Best selling products"
                        productArray={
                          category["Best selling products"]?.products
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <ProductCardTwo
            pName="PRoduct Title"
            pDesc="Something about the product and vlah blah"
            price={98}
            rating={3}
            img="http://placeimg.com/640/480/city"
          />
        </div>
      </div>
    </div>
  );
}

export default Homepage;
