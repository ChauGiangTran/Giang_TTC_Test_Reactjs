import { fork, all } from 'redux-saga/effects';
import blogSagas from './blogSaga';

export default function* rootSaga() {
  yield all([fork(blogSagas)]);
}
