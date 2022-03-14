import ListElementOne from "components/common/lists/ListElementOne";
import ProductCardOne from "components/common/card/ProductCardOne";

interface CategoryProductListProps {
  listHeader: string;
  listSubTopicArray: Array<string> | undefined;
  productArray: Array<ObjProp> | undefined;
}

interface ObjProp {
  pName: string;
  pDesc: string;
  price: number;
  img: string;
}

const CategoryProductList = ({
  listHeader,
  listSubTopicArray,
  productArray,
}: CategoryProductListProps) => {
  // const spreadObject = (obj) => {}
  return (
    <div className="d-flex justify-content-center">
      <div className="me-5">
        <ListElementOne
          listHeader={listHeader}
          listSubTopicArray={listSubTopicArray}
        />
      </div>
      <div className="d-flex justify-content">
        {productArray?.map((iter, ind) => (
          <div key={ind} className="mx-2">
            <ProductCardOne
              pName={iter.pName}
              pDesc={iter.pDesc}
              price={iter.price}
              img={iter.img}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProductList;
