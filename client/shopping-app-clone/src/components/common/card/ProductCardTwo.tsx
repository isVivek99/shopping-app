import Button from "../button/Button";
import ListItemsCard from "../lists/ListItemsCard";
import Rating from "../rating/Rating";
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
            <ListItemsCard category="Freshness" value="New" highlight={true} />
            <ListItemsCard
              category="Farm"
              value="Grocery Tarm Fields"
              highlight={false}
            />
            <ListItemsCard
              category="Delivery"
              value="Europe"
              highlight={false}
            />
            <ListItemsCard category="Stock" value="320 pcs" highlight={true} />
          </span>
        </div>
        <div className="d-flex order">
          <span className="price">{price} USD</span>
          <span className="mt-4 f-12 shipping ">Free Shipping</span>
          <span className="f-12 ship-time">Delivery in 1 day</span>
          <span className="mt-3 order-btn">
            <Button
              type="pri"
              size="mid"
              text="Product Detail"
              arrow="ra"
              clickHandle={function () {}}
            />
          </span>
          <span className="mt-2 order-btn">
            <Button
              type="sim"
              size="sml"
              text="Add to wishlist"
              arrow="fav "
              clickHandle={function () {}}
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCardTwo;
