import { takeEvery } from 'redux-saga/effects';

function* logic() {
  yield takeEvery('HELLO', function* (action) {
    console.log(action);
  });
}

export default logic;
