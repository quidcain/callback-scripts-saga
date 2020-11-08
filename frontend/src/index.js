import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { loadScript } from './api';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(state => state, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);

const runButton = document.getElementById('run');
runButton.addEventListener('click', () => {
  store.dispatch({ type: 'RUN' });
});
