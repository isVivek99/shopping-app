import React from "react";
import Button from "../button/Button";
import "assets/scss/common/card/productCardOne.scss";
import Tags from "../tags/Tags";

interface productCardProps {
  discount?: string;
  pName: string;
  pDesc: string;
  price: number;
}

const ProductCardOne = ({
  discount,
  pName,
  pDesc,
  price,
}: productCardProps) => {
  // const [props, setprops] = useState<productCardProps>({
  //   discount: "",
  //   pName: "Product Title",
  //   pDesc: "Space for a small product description",
  //   price: 1.58,
  // });

  // useEffect(() => {
  //   setprops({ discount: discount, pName: pName, pDesc: pDesc, price: price });
  //   console.log(props.discount, props.pName);
  // }, []);

  return (
    <div>
      <div className="ctn">
        <div className="image position-relative">
          <img src="http://placeimg.com/640/480/food"></img>
          <span className="discountTag position-absolute">
            <Tags
              type={"priT"}
              size={"smlT"}
              text={discount || ""}
              close={false}
            />
          </span>
        </div>
        <div className="content mt-3">
          <div className="details">
            <span className="title">{pName}</span>
            <span className="summary">{pDesc}</span>
          </div>
          <div className="buy">
            <span className="price">{price} USD</span>
            <Button type={"pri"} size={"sml"} text={"Buy Now"} arrow={"ra"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardOne;
