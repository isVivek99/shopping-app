import React from "react";
import Button from "../button/Button";
import "assets/scss/common/card/productCardOne.scss";

const ProductCardOne = () => {
  return (
    <div>
      <div className="ctn">
        <div className="image">
          <img src="http://placeimg.com/640/480/food"></img>
        </div>
        <div className="content">
          <div className="details">
            <span className="title">Product Title</span>
            <span className="summary">
              Space for a small product description
            </span>
          </div>
          <div className="buy">
            <span className="price">1.48 USD</span>
            <Button type={"pri"} size={"sml"} text={"Buy Now"} arrow={"ra"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOne;
