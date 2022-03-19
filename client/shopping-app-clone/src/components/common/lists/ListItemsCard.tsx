interface listProps {
  category: string;
  value: string;
}

const ListItemsCard = ({ category, value }: listProps) => {
  return (
    <div>
      <span className="category">{category}</span>
      <span className="value">{value}</span>
    </div>
  );
};

export default ListItemsCard;
