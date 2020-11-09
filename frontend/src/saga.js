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
  join,
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
  const taskA = yield effectCreator(getDataA);
  const taskB = yield effectCreator(getDataB);
  yield put({ type: 'UPDATE_TASKS', payload: [taskA, taskB] });
  yield join([taskA, taskB]);
  yield put({ type: 'UPDATE_TASKS' });
}

function* getDataA() {
  const data = yield call(api.getDataA);
  console.log('dataA', data);
  yield put({ type: 'UPDATE_TASKS' });
}

function* getDataB() {
  const data = yield call(api.getDataB);
  console.log('dataB', data);
  yield put({ type: 'UPDATE_TASKS' });
}

function* logTasks() {
  const tasks = yield select(state => state.tasks);
  tasks.forEach(task => {
    console.log(
      `tasks.id == ${task.id}; tasks.isRunning == ${task.isRunning()}`,
    );
  });
}

export default function* () {
  yield all([call(mainWatcher), takeEvery('UPDATE_TASKS', logTasks)]);
}
