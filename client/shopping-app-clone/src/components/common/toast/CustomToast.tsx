import styles from 'assets/scss/common/toast/toast.module.scss';
import React, { useRef } from 'react';
interface toastProps {
  message: string;
  variant: string;
  style: object;
}

const useCustomToast = ({
  message,
  variant = 'success',
  style = {},
}: toastProps) => {
  const toastRef = useRef(document.createElement('div'));

  const openToast = () => {
    toastRef.current.classList.add(styles.show);
    setTimeout(function () {
      toastRef.current.classList.remove(styles.show);
    }, 3000);
  };
  let toastStyle: React.CSSProperties | undefined;
  switch (variant) {
    case 'success':
      toastStyle = {
        backgroundColor: '#adebad',
        borderTop: '5px solid #2db92d',
      };

      break;
    case 'error':
      toastStyle = {
        backgroundColor: '#ffcccc',
        borderTop: '5px solid #ff0000',
      };

      break;
    case 'info':
      toastStyle = {
        backgroundColor: '#ccf2ff',
        borderTop: '5px solid #33ccff',
      };

      break;
    case 'warning':
      toastStyle = {
        backgroundColor: '#fff0b3',
        borderTop: '5px solid #ffcc00',
      };

      break;
    default:
      break;
  }
  const ToastComponent = () => (
    <React.Fragment>
      <div
        ref={toastRef}
        className={styles.snackbar}
        style={{ ...toastStyle, ...style }}
      >
        <div className={styles.content}>{message}</div>
      </div>
    </React.Fragment>
  );
  return { openToast, ToastComponent };
};

export default useCustomToast;
