import Rating from "../rating/Rating";
import "assets/scss/common/list/listRating.scss";

const ListRating = () => {
  return (
    <div className="d-flex ctn3">
      <span className="title3 f-18 fw-bolder">Rating</span>
      <span className="listItems">
        <input type="checkbox" id="listItem1" className="checkbox" />
        <label htmlFor="listItem1">
          <Rating type="static" stars={5} />
        </label>
      </span>
      <span className="listItems">
        <input type="checkbox" id="listItem2" className="checkbox" />
        <label htmlFor="listItem2">
          <Rating type="static" stars={4} />
        </label>
      </span>
      <span className="listItems">
        <input type="checkbox" id="listItem3" className="checkbox" />
        <label htmlFor="listItem3">
          <Rating type="static" stars={3} />
        </label>
      </span>
      <span className="listItems">
        <input type="checkbox" id="listItem4" className="checkbox" />
        <label htmlFor="listItem4">
          <Rating type="static" stars={2} />
        </label>
      </span>
      <span className="listItems">
        <input type="checkbox" id="listItem5" className="checkbox" />
        <label htmlFor="listItem5">
          <Rating type="static" stars={1} />
        </label>
      </span>
    </div>
  );
};

export default ListRating;
