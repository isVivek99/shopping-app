import { useState } from 'react';
import rootReducer from 'redux/reducers';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import 'assets/scss/common/dropdown/dropdownListOne.scss';

interface ObjType {
  title?: string;
  pName?: string;
  id?: number;
}

interface dropDownListProps {
  listArray: Array<ObjType> | undefined;
  setDropdownStatus: any;
  dropdownStatus: boolean;
  dropdownValue: string;
  setStateDropdownValue: any;
  listHeader?: string;
}

const DropdownListOne = ({
  listArray,
  setDropdownStatus,
  dropdownStatus,
  dropdownValue,
  setStateDropdownValue,
  listHeader,
}: dropDownListProps) => {
  const navigate = useNavigate();

  type RootStore = ReturnType<typeof rootReducer>;
  const { userDetails, userLoggedIn } =
    useSelector((state: RootStore) => state?.reduceUsers) || {};

  const toggleDropdown = () => {
    if (!userLoggedIn) {
      navigate('../login');
    }
    setDropdownStatus((prev: boolean) => !prev);
  };
  const setDropdownValue = (e: any) => {
    const value = e.target.lastElementChild?.value;

    if (value) {
      setStateDropdownValue(value);
      toggleDropdown();
      return;
    }

    setStateDropdownValue('Recommended');
    toggleDropdown();
  };
  return (
    <div>
      <div
        className={`sort ${dropdownStatus ? 'sort__active' : ''} `}
        onClick={toggleDropdown}
      >
        <span className='sort__by f-12'>{listHeader}</span>
        <span className='sort__list__category recommended f-14 pe-5'>
          {dropdownValue}
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
        onClick={(e) => setDropdownValue(e)}
      >
        {listArray?.map((item, index) => (
          <li
            key={index}
            className={
              dropdownValue === item.title
                ? 'sort__list__item__active'
                : 'sort__list__item'
            }
          >
            <input
              type='radio'
              value={item.title}
              checked={dropdownValue === item.title}
              readOnly={true}
            />
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropdownListOne;
