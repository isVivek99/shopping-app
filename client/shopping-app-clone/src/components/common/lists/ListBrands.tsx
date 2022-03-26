import "assets/scss/common/list/listRating.scss";

const ListBrands = () => {
  return (
    <div className="d-flex ctn3">
      <span className="title3 f-18 fw-bolder">Brands</span>
      <span className="listItems">
        <input type="checkbox" id="listItem1" className="checkbox" />
        <label htmlFor="listItem1">Filtre by brand item </label>
      </span>
      <span className="listItems">
        <input type="checkbox" id="listItem2" className="checkbox" />
        <label htmlFor="listItem2">Filtre by brand item </label>
      </span>
      <span className="listItems">
        <input type="checkbox" id="listItem3" className="checkbox" />
        <label htmlFor="listItem3">Filtre by brand item </label>
      </span>
      <span className="listItems">
        <input type="checkbox" id="listItem4" className="checkbox" />
        <label htmlFor="listItem4">Filtre by brand item </label>
      </span>
      <span className="listItems">
        <input type="checkbox" id="listItem5" className="checkbox" />
        <label htmlFor="listItem5">Filtre by brand item </label>
      </span>
    </div>
  );
};

export default ListBrands;
