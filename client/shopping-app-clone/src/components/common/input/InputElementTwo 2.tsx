import { useRef, useState } from 'react';
import 'assets/scss/common/input/inputElementTwo.scss';
import { emailValidationRegex } from 'utils/validateUserForm';

interface userInfoProps {
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;
  townOrCity: string;
  state: string;
  zipOrPin: string;
}

interface InputEleTwoProps {
  placeholder: string;
  label: string;
  type?: string;
  property: string;
  setUserInfo: any;
  userInfo: userInfoProps;
  errorString: string;
}

const InputElementTwo = ({
  placeholder,
  label,
  type = 'text ',
  property,
  userInfo,
  setUserInfo,
  errorString,
}: InputEleTwoProps) => {
  const inputEleRef = useRef<HTMLInputElement>(document.createElement('input'));
  const [inputError, setInputError] = useState(false);

  const setInput = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
    setInputError(false);
  };
  const setBlur = (e: any) => {
    const { name, value } = e.target;

    if (value.length === 0) setInputError(true);

    if (name === 'emailAddress' && !emailValidationRegex.test(value)) {
      setInputError(true);
    }

    if (name === 'phoneNumber' && (value.length > 10 || value.length < 10)) {
      setInputError(true);
    }
  };

  return (
    <div>
      <div className='input__ele__two px-2 input__ele__two__label'>
        <label htmlFor={property} className='text-600 f-12'>
          {label}
        </label>
        <input
          ref={inputEleRef}
          value={userInfo[property as keyof typeof userInfo]}
          type={type}
          className={`w-100 input__ele__two__content py-2 px-4`}
          placeholder={placeholder}
          name={property}
          onChange={(e) => setInput(e)}
          onBlur={(e) => setBlur(e)}
        />
      </div>
      <p
        className={`ms-2 text__error f-12 mb-0 mt-1 ${
          inputError ? '' : 'd-none'
        } `}
      >
        {errorString}
      </p>
    </div>
  );
};

export default InputElementTwo;
