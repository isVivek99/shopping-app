import Rating from "../rating/Rating";

const ProductCardTwo = () => {
  return (
    <div>
      <div className="d-flex container">
        <div className="image">
          <img src="http://placeimg.com/640/480/fashion"></img>
        </div>
        <div className="details">
          <span className="title">Product Title</span>
          <span className="desc">Space for a small product description</span>
          <Rating type="static" stars={4} />
          
        </div>
        <div className="order"></div>
      </div>
    </div>
  );
};

export default ProductCardTwo;
