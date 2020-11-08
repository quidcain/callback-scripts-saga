import {
  all,
  take,
  call,
  fork,
  spawn,
  cancel,
  put,
  takeEvery,
  select,
} from 'redux-saga/effects';
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
  yield put({ type: 'UPDATE_EFFECTS', payload: [effectA, effectB] });
}

function* getDataA() {
  const data = yield call(api.getDataA);
  console.log('dataA', data);
}

function* getDataB() {
  const data = yield call(api.getDataB);
  console.log('dataB', data);
}

function* logEffects() {
  const effects = yield select(state => state.effects);
  effects.forEach(effect => {
    console.log(
      `effect.id == ${effect.id}; effect.isRunning == ${effect.isRunning()}`,
    );
  });
}

export default function* () {
  yield all([call(mainWatcher), takeEvery('UPDATE_EFFECTS', logEffects)]);
}
