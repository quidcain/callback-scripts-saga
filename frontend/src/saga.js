import { all, take, call, fork, spawn, cancel } from 'redux-saga/effects';
import * as api from './api';

function* mainWatcher() {
  const dataAPromise = api.getDataA();
  yield take('RUN');
  while (true) {
    const callbacksWorkerTask = yield fork(callbacksWorker, dataAPromise);
    const removeCallbackScript = api.loadScript(
      'http://localhost:3500/callback-script.js',
    );
    yield take('RUN');
    yield cancel(callbacksWorkerTask);
    removeCallbackScript();
  }
}

function* callbacksWorker(dataAPromise) {
  yield spawn(getDataA, dataAPromise);
}

function* getDataA(dataPromise) {
  const data = yield dataPromise;
  console.log('dataA', data);
}

export default function* () {
  yield all([call(mainWatcher)]);
}
