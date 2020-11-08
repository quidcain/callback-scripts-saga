import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { loadScript } from './api';
import saga from './saga';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(state => state, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(saga);
store.dispatch({
  type: 'HELLO',
  text: 'hello',
});

const removeCallbackScript = loadScript(
  'http://localhost:3500/callback-script.js',
);
setTimeout(() => {
  removeCallbackScript();
}, 5000);
