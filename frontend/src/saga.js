import { all, take, call, fork, spawn, cancel } from 'redux-saga/effects';
import * as api from './api';

function* mainWatcher() {
  const dataAPromise = api.getDataA();
  const dataBPromise = api.getDataB();
  yield take('RUN');
  while (true) {
    const callbacksWorkerTask = yield fork(
      callbacksWorker,
      dataAPromise,
      dataBPromise,
    );
    const removeCallbackScript = api.loadScript(
      'http://localhost:3500/callback-script.js',
    );
    yield take('RUN');
    yield cancel(callbacksWorkerTask);
    removeCallbackScript();
  }
}

function* callbacksWorker(dataAPromise, dataBPromise) {
  yield fork(getDataA, dataAPromise);
  yield fork(getDataB, dataBPromise);
}

function* getDataA(dataPromise) {
  const data = yield dataPromise;
  console.log('dataA', data);
}

function* getDataB(dataPromise) {
  const data = yield dataPromise;
  console.log('dataB', data);
}

export default function* () {
  yield all([call(mainWatcher)]);
}
