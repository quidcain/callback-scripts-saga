import { all, take, call, fork, spawn } from 'redux-saga/effects';
import * as api from './api';

function* main() {
  const dataAPromise = api.getDataA();
  while (true) {
    yield fork(getDataA, dataAPromise);
    const removeCallbackScript = api.loadScript(
      'http://localhost:3500/callback-script.js',
    );
    yield take('RUN');
    removeCallbackScript();
  }
}

function* getDataA(dataPromise) {
  const data = yield dataPromise;
  console.log(data);
}

export default function* () {
  yield all([call(main)]);
}
