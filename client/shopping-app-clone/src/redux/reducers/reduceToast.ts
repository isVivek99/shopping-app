import types from 'redux/actionTypes';

interface ToastInfo {
  message: string;
  variant: string;
  position: string;
  show: boolean;
  id: number;
}

interface defaultToastState {
  toastId: number;
  toastArray: Array<ToastInfo>;
}

const reduceToast = (
  toastArray: Array<defaultToastState> = [],
  action: { type: string; payload: ToastInfo }
) => {
  switch (action.type) {
    case types.SET_TOAST: {
      console.log(toastArray);

      return [...toastArray, { ...action.payload }];
    }
    case types.CLOSE_TOAST: {
      console.log('remove toast', toastArray, action.payload.id);

      const filteredArray = toastArray.filter(
        (ele) => ele.toastId !== action.payload.id
      );
      console.log(filteredArray);

      return [...filteredArray];
    }
    default:
      return toastArray;
  }
};

export default reduceToast;
