import Button from 'components/common/button/Button';
import 'assets/scss/common.scss';
import 'assets/scss/common/list/listOne.scss';
interface listProps {
  listHeader: string;
  listSubTopicArray: Array<string>;
}

function ListElementOne({ listSubTopicArray, listHeader }: listProps) {
  const subTopicArray = [
    'Bakery',
    'Fruit and vegetables',
    'Meat and fish',
    'Drinks',
  ];
  return (
    <div className='list__one'>
      <h3 className='f-18 list__header'>{listHeader}</h3>
      <ul className='ps-1 mb-5'>
        {listSubTopicArray.map((item, index) => (
          <li key={index} className='f-14 text-green list__item'>
            {item}
          </li>
        ))}
      </ul>
      <Button type='sim' size='mid' text='More categories' arrow='ra' />
    </div>
  );
}

export default ListElementOne;
