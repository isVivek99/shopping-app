import Button from 'components/common/button/Button';

import 'assets/scss/common.scss';
import 'assets/scss/common/list/listOne.scss';
import { Link } from 'react-router-dom';
interface listProps {
  listHeader: string | undefined;
  listSubTopicArray: any;
}

function ListElementOne({ listSubTopicArray, listHeader }: listProps) {
  return (
    <div className='list__one'>
      <h3 className='f-18 list__header'>{listHeader}</h3>
      <ul className='ps-1 mb-5'>
        {listSubTopicArray?.map((item: any, index: number) => (
          <Link
            key={index}
            to={`/v1/product/${item.id}/${item.pName}`}
            className='text__link'
          >
            <li className='f-14 text-green list__item'>{item.pName}</li>
          </Link>
        ))}
      </ul>
      {/* <Button
        type='sim'
        size='mid'
        text='More categories'
        arrow='ra'
        clickHandle={() => console.log('clicked')}
      /> */}
    </div>
  );
}

export default ListElementOne;
