import Tags from "../tags/Tags";

const ListCategory = () => {
  return (
    <div className="d-flex ctn3">
      <span className="title3 f-18 fw-bolder">Categories</span>
      <span className="listItems categoryListItem">
        <span>Catergory Name</span>
        <Tags type="priT" size="smlT" text="236" close={false} />
      </span>
      <span className="listItems categoryListItem">
        <span>Catergory Name</span>
        <Tags type="priT" size="smlT" text="236" close={false} />
      </span>
      <span className="listItems categoryListItem">
        <span>Catergory Name</span>
        <Tags type="priT" size="smlT" text="236" close={false} />
      </span>
      <span className="listItems categoryListItem">
        <span>Catergory Name</span>
        <Tags type="priT" size="smlT" text="236" close={false} />
      </span>
    </div>
  );
};

export default ListCategory;
