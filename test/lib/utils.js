/* eslint no-param-reassign: 0 */
import getHistory from './getHistory';

const waitTime = 1000;

export function listenOnce(cb) {
  const unlisten = getHistory().listen((location, action) => {
    cb(location, action);
    unlisten();
  });
}

const nav = method => (path, state, cb) => {
  if (typeof state === 'function') {
    cb = state;
    state = null;
  }

  // listen for change once, call cb when done, passes (location, action)
  listenOnce(cb);

  setTimeout(() => {
    getHistory()[method](path, state);
  }, waitTime);
};

export function slowPush(path, state, cb) {
  return nav('push')(path, state, cb);
}

export function slowReplace(path, state, cb) {
  return nav('replace')(path, state, cb);
}

export function slowGo(dir, cb) {
  window.history.go(dir);
  setTimeout(() => {
    cb();
  }, waitTime);
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
