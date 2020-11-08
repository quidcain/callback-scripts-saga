import { all, take, call, fork, spawn, cancel } from 'redux-saga/effects';
import * as api from './api';

function* mainWatcher() {
  let { effectCreatorName } = yield take('RUN');
  while (true) {
    const callbacksWorkerTask = yield fork(callbacksWorker, effectCreatorName);
    const removeCallbackScript = api.loadScript(
      'http://localhost:3500/callback-script.js',
    );
    ({ effectCreatorName } = yield take('RUN'));
    yield cancel(callbacksWorkerTask);
    removeCallbackScript();
  }
}

function* callbacksWorker(effectCreatorName) {
  let effectCreator = {
    fork,
    spawn,
  }[effectCreatorName];
  const effectA = yield effectCreator(getDataA);
  const effectB = yield effectCreator(getDataB);
  window.effects = (window.effects || []).concat([effectA, effectB]);
  window.effects.forEach(effect => {
    console.log(
      `effect.id == ${effect.id}; effect.isRunning == ${effect.isRunning()}`,
    );
  });
}

function* getDataA() {
  const data = yield call(api.getDataA);
  console.log('dataA', data);
}

function* getDataB() {
  const data = yield call(api.getDataB);
  console.log('dataB', data);
}

export default function* () {
  yield all([call(mainWatcher)]);
}
