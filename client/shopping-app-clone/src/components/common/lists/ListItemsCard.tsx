import 'assets/scss/common/list/listItemCard.scss';
interface listProps {
  category: string;
  value: string;
  color?: string;
}

const ListItemsCard = ({ category, value, color }: listProps) => {
  return (
    <div
      style={{
        width: '219px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '0px',
      }}
    >
      <span className='category' style={{ width: '106px' }}>
        {category}
      </span>
      <span className={`value ${color}`}>{value}</span>
    </div>
  );
};

export default ListItemsCard;
