import createHashHistory from '../../src/createHashStateHistory';

let history;

// history instance singleton
export default function createHistory() {
  if (history) return history;
  history = createHashHistory();
  return history;
}
