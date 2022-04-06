import styles from 'assets/scss/common/toast/toast.module.scss';
import React, { useRef, useState, useEffect } from 'react';

const useCustomToast = () => {
  const toastRef = useRef(document.createElement('div'));
  const [content, setContent] = useState('');

  let flavour = 'error';

  const openToast = (message: string, variant: string) => {
    flavour = variant;
    setContent(message);
  };

  useEffect(() => {
    if (content) {
      toastRef.current.classList.add(styles[flavour]);
      toastRef.current.classList.add(styles.show);
      setTimeout(function () {
        toastRef.current.classList.remove(styles.show);
      }, 3000);
      setTimeout(function () {
        setContent('');
      }, 3100);
    }
  }, [content]);

  const ToastComponent = () => (
    <>
      <div ref={toastRef} className={styles.snackbar} style={{ ...styles }}>
        <div className={styles.content}>{content}</div>
      </div>
    </>
  );
  return { openToast, ToastComponent };
};

export default useCustomToast;
