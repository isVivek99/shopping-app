interface listProps {
  category: string;
  value: string;
  highlight: boolean;
}

const ListItemsCard = ({ category, value, highlight }: listProps) => {
  return (
    <div
      style={{
        width: "219px",
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        gap: "0px",
      }}
    >
      <span className="category" style={{ width: "106px" }}>
        {category}
      </span>
      <span
        className="value"
        style={highlight ? { color: "#6a983c" } : { color: "#a9a9a9" }}
      >
        {value}
      </span>
    </div>
  );
};

export default ListItemsCard;
