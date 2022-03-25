import Rating from "../rating/Rating";
import "assets/scss/common/list/listRating.scss";

const ListRating = () => {
  return (
    <div className="d-flex ctn3">
      <span className="title3 f-18 fw-bolder">Rating</span>
      <span>
        <input type="checkbox" id="rating5" className="listItems" />
        <label htmlFor="rating5">
          {" "}
          <Rating type="static" stars={5} />
        </label>
      </span>
      <span>
        <input type="checkbox" id="rating4" className="listItems" />
        <label htmlFor="rating4">
          {" "}
          <Rating type="static" stars={5} />
        </label>
      </span>
      <span>
        <input type="checkbox" id="rating3" className="listItems" />
        <label htmlFor="rating3">
          {" "}
          <Rating type="static" stars={5} />
        </label>
      </span>
      <span>
        <input type="checkbox" id="rating2" className="listItems" />
        <label htmlFor="rating2">
          {" "}
          <Rating type="static" stars={2} />
        </label>
      </span>
      <span>
        {" "}
        <input type="checkbox" id="rating1" className="listItems" />
        <label htmlFor="rating1">
          {" "}
          <Rating type="static" stars={1} />
        </label>
      </span>
    </div>
  );
};

export default ListRating;
