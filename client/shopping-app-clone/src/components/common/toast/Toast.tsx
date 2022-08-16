import React, { useState, useEffect } from 'react';
import { closeToast } from 'actions';
import { useDispatch } from 'react-redux';

interface toastList {
  message: string;
  variant: string;
  position: string;
  show: boolean;
  toastId: number;
  toastArrayLength: number;
}

const Toast = ({
  message,
  variant,
  position,
  show,
  toastId,
  toastArrayLength,
}: toastList) => {
  console.log('araylen:', toastArrayLength);

  const dispatch = useDispatch();
  type interval = ReturnType<typeof setInterval>;
  let timerId: interval;
  const [timer, setTimer] = useState(4000);
  const [showToast, setShowToast] = useState(true);
  const [timerIdSetter, setTimerId] = useState<any>();
  const [arrayLength, setArrayLength] = useState(0);

  const onCloseHandler = (toastId: number) => {
    // console.log('close ', toastId);
    // setShowToast(false);
    dispatch(closeToast(toastId));
  };

  useEffect(() => {
    console.log(timer, toastId, timerIdSetter);

    if (timer === 0) {
      console.log('close ', toastId, timerIdSetter);
      clearInterval(timerIdSetter);
      onCloseHandler(toastId);
    }
  }, [timer]);

  useEffect(() => {
    setTimer(4000);
    timerId = setInterval(() => {
      setTimer((prev) => prev - 100);
    }, 100);
    setTimerId(timerId);

    return () => {
      if (timerIdSetter) clearInterval(timerId);
    };
  }, []);

  return (
    <div
      className={`snackbar ${position} ${variant}  px-4 d-flex align-items-center justify-content-between`}
    >
      <div className='px-2 '>
        <p
          className={`${
            variant === 'success'
              ? 'fas fa-check icon_bg_green icon'
              : 'fas fa-exclamation icon_bg_red icon'
          }    py-2 mb-0`}
        ></p>
      </div>
      <div className='content'>
        <p className='f-12 mb-0'>{message}</p>
      </div>
      <div
        onClick={() => onCloseHandler(toastId)}
        className='f-16 px-3 f-600 fas'
      >
        X
      </div>
      <div className='toast_timer'></div>
    </div>
  );
};

export default Toast;
