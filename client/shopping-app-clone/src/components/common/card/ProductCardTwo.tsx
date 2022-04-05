import Button from "components/common/button/Button";
import ListItemsCard from "components/common/lists/ListItemsCard";
import Rating from "components/common/rating/Rating";
import "assets/scss/common/card/productCardTwo.scss";

interface productCardProps {
  pName: string;
  pDesc: string;
  price: number;
  img: string;
  rating: number;
}

const ProductCardTwo = ({
  pName,
  pDesc,
  price,
  img,
  rating,
}: productCardProps) => {
  return (
    <div>
      <div className="d-flex ctn2">
        <div className="d-flex image">
          <img className="product__card__image2" src={`${img}`}></img>
        </div>
        <div className="d-flex details2">
          <span className="f-18 title1">{pName}</span>
          <span className="f-12 desc">{pDesc}</span>
          <Rating type="static" stars={rating} />
          <span className="list">
            <ListItemsCard category="Freshness" value="New" color="green" />
            <ListItemsCard
              category="Farm"
              value="Grocery Tarm Fields"
              color="gray"
            />
            <ListItemsCard category="Delivery" value="Europe" color="gray" />
            <ListItemsCard category="Stock" value="320 pcs" color="green" />
          </span>
        </div>
        <div className="d-flex order">
          <span className="price">{price} USD</span>
          <span className="mt-4 f-12 shipping ">Free Shipping</span>
          <span className="f-12 ship-time">Delivery in 1 day</span>
          <span className="mt-3 order-btn">
            <Button type="pri" size="mid" text="Product Detail" arrow="ra" />
          </span>
          <span className="mt-2 order-btn">
            <Button type="sim" size="sml" text="Add to wishlist" arrow="fav" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardTwo;
