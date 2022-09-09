import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'assets/scss/common/dropdown/dropdownListOne.scss';

interface ObjType {
  title?: string;
  pName?: string;
  id?: number;
}

interface dropDownListProps {
  listSubTopicArray: Array<ObjType> | undefined;
  listHeader: string | undefined;
  dropdownValue?: string;
}

const DropdownListOne = ({
  listSubTopicArray,
  listHeader,
}: dropDownListProps) => {
  const [dropdownStatus, setDropdownStatus] = useState(false);

  const toggleDropdown = () => setDropdownStatus((prev: boolean) => !prev);

  return (
    <div className='position-relative'>
      <div
        className={`sort ${dropdownStatus ? 'sort__active' : ''} `}
        onClick={toggleDropdown}
      >
        <span className='sort__by f-12'>{listHeader}</span>
        <span className='sort__list__category recommended f-14 pe-5'>
          {/* {dropdownValue||''} */}
        </span>
        <span className='down__arrow position-absolute'>
          <i
            className={`fas fa-angle-down ${dropdownStatus ? 'rotate' : ''}`}
          ></i>
        </span>
      </div>

      <ul
        className={`position-absolute px-0 sort__list ${
          dropdownStatus ? 'active' : ''
        }`}
      >
        {listSubTopicArray?.map((item, index) => (
          <Link
            key={index}
            to={`/v1/product/${item.id}/${item.pName}`}
            className='text__link'
          >
            <li className={'sort__list__item'}>{item.pName}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default DropdownListOne;
