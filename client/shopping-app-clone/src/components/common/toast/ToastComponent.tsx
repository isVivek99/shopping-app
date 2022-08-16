import { useSelector } from 'react-redux';
import rootReducer from 'redux/reducers';
import Toast from 'components/common/toast/Toast';
import 'assets/scss/common/toast/toast.scss';

interface toastList {
  message: string;
  variant: string;
  position: string;
  show: boolean;
  toastId: number;
}

const ToastComponent = () => {
  type RootStore = ReturnType<typeof rootReducer>;
  const toastArray: Array<toastList> =
    useSelector((state: RootStore) => state.reduceToast) || [];

  return (
    <>
      {toastArray.length > 0 && (
        <div className='notification_container'>
          {toastArray.map((toast, i) => (
            <div key={i}>
              <Toast
                toastArrayLength={toastArray.length}
                message={toast.message}
                variant={toast.variant}
                position={toast.position}
                show={toast.show}
                toastId={toast.toastId}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ToastComponent;
