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
const tasksTable = document.getElementById('tasks');
store.subscribe(() => {
  const headers = `
    <tr>
      <th>task.id</th>
      <th>task.isRunnning()</th>
    </tr>
  `;
  const rows = store.getState().tasks.reduce((acc, curr) => {
    return (
      acc +
      `
        <tr>
          <td>${curr.id}</td>
          <td>${curr.isRunning()}</td>
        </tr>
      `
    );
  }, '');
  tasksTable.innerHTML = headers + rows;
});
window.store = store;
