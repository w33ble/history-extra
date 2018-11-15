/* eslint no-param-reassign: 0 */
import getHistory from './getHistory';

export function listenOnce(cb) {
  const unlisten = getHistory().listen((location, action) => {
    cb(location, action);
    unlisten();
  });
}

export function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
}
