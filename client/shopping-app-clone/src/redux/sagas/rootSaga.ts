import { all, takeLatest } from 'redux-saga/effects';
import types from 'redux/actionTypes';
import { handleLoginUser, handleAddUser } from 'redux/sagas/handlers/user';

//watcher saga to look for emmited actions
export function* watcherSaga() {
  yield takeLatest(types.LOGIN_USER, handleLoginUser);
  yield takeLatest(types.ADD_USER, handleAddUser);
}
