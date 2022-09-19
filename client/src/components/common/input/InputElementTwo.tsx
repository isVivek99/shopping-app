import { useRef, useState } from 'react';
import 'assets/scss/common/input/inputElementTwo.scss';
import { emailValidationRegex } from 'utils/validateUserForm';

interface userInfoProps {
  firstName?: string;
  lastName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  address?: string;
  townOrCity?: string;
  state?: string;
  zipOrPin?: string;
  password?: string;
}

interface InputEleTwoProps {
  placeholder: string;
  label: string;
  type?: string;
  property: string;
  setUserInfo: any;
  userInfo: userInfoProps;
  errorString: string;
  setErrors?: any;
  padding?: string;
}

const InputElementTwo = ({
  placeholder,
  label,
  type = 'text',
  property,
  userInfo,
  setUserInfo,
  errorString,
  setErrors,
  padding = 'py-2',
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

    if (value.length === 0) {
      setInputError(true);
      return;
    }

    if (name === 'emailAddress' && !emailValidationRegex.test(value)) {
      setInputError(true);
      setErrors((prev: any) => ({
        ...prev,
        emailError: errorString,
      }));
      return;
    }

    if (name === 'phoneNumber' && (value.length > 10 || value.length < 10)) {
      setInputError(true);
      return;
    }

    if (name === 'password' && value.length < 6) {
      setInputError(true);
      setErrors((prev: any) => ({
        ...prev,
        passwordError: errorString,
      }));
      return;
    }
    //on blur if no error set error values as empty
    setErrors((prev: any) => ({
      emailError: '',
      passwordError: '',
    }));
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
          className={`w-100 input__ele__two__content px-4 ${padding}`}
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
