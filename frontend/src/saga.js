import { all, take, call, fork, spawn, cancel } from 'redux-saga/effects';
import * as api from './api';

function* mainWatcher() {
  const dataAPromise = api.getDataA();
  const dataBPromise = api.getDataB();
  let { effectCreatorName } = yield take('RUN');
  while (true) {
    const callbacksWorkerTask = yield fork(
      callbacksWorker,
      effectCreatorName,
      dataAPromise,
      dataBPromise,
    );
    const removeCallbackScript = api.loadScript(
      'http://localhost:3500/callback-script.js',
    );
    ({ effectCreatorName } = yield take('RUN'));
    yield cancel(callbacksWorkerTask);
    removeCallbackScript();
  }
}

function* callbacksWorker(effectCreatorName, dataAPromise, dataBPromise) {
  let effectCreator = {
    fork,
    spawn,
  }[effectCreatorName];
  yield effectCreator(getDataA, dataAPromise);
  yield effectCreator(getDataB, dataBPromise);
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
