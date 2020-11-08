import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

const runForkButton = document.getElementById('run-fork');
runForkButton.addEventListener('click', () => {
  store.dispatch({ type: 'RUN', effectCreatorName: 'fork' });
});
const runSpawnButton = document.getElementById('run-spawn');
runSpawnButton.addEventListener('click', () => {
  store.dispatch({ type: 'RUN', effectCreatorName: 'spawn' });
});
