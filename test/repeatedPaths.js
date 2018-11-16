import test from 'tape-rollup';
import getHistory from './lib/getHistory';
import { listenOnce } from './lib/utils';

// IE reports one thing on window.location.href, and shows another thing in the address bar,
// so it can't really be tested correctly :(
const isBrokenBrowser = window.navigator.userAgent.indexOf('Trident') !== -1;

const getUniqeState = () => ({ time: new Date().getTime(), math: Math.random() });
const getState = () => (window.history.state ? window.history.state : {});

test('replacing the same path without state', { timeout: 20000 }, async t => {
  t.plan(8);
  const history = getHistory();
  const targetPath = 'replace1';

  // get to a known state (add two history entries, the second will be relaced)
  history.push('replace-without-state');
  t.equals(window.location.hash, `#/replace-without-state`, 'inital hash updated');
  history.push('replace-without-state-replaced');
  t.equals(window.location.hash, `#/replace-without-state-replaced`, 'inital hash updated again');

  // replace path with no state
  history.replace(targetPath);
  t.equals(window.location.hash, `#/${targetPath}`, 'navigation successful');
  t.notOk(getState().state, 'state is empty');

  // replace path with state
  history.replace(targetPath, getUniqeState());
  t.equals(window.location.hash, `#/${targetPath}`, 'hash location is the same');
  t.ok(getState().state, 'state is now set');

  // navigate back and check the hash
  listenOnce((location, action) => {
    const checkPath = isBrokenBrowser ? '#/' : '#/replace-without-state';
    t.equals(action, 'POP', 'pop listener');
    t.equals(window.location.hash, checkPath, 'back to the start');
  });

  window.history.back();
});

test('replacing the same path with state', { timeout: 3000 }, t => {
  t.plan(8);

  // get to a known state (add two history entries, the second will be relaced)
  getHistory().push('replace-with-state');
  t.equals(window.location.hash, `#/replace-with-state`, 'inital hash updated');
  getHistory().push('replace-with-state-replaced');
  t.equals(window.location.hash, `#/replace-with-state-replaced`, 'inital hash updated');

  // replace the url once
  const targetPath = 'replace1';
  const firstState = getUniqeState();
  getHistory().replace(targetPath, firstState);
  t.equals(window.location.hash, `#/${targetPath}`, 'navigation successful');
  t.deepEqual(getState().state, firstState, 'state is set');

  // replace the same url with new state
  getHistory().replace(targetPath, getUniqeState());
  t.equals(window.location.hash, `#/${targetPath}`, 'hash location is the same');
  t.notDeepEqual(getState().state, firstState, 'state is updated');

  // confirm that going back takes us to the first pushed route
  listenOnce((location, action) => {
    const checkPath = isBrokenBrowser ? '#/' : '#/replace-with-state';
    t.equals(action, 'POP', 'popstate listener is called');
    t.equals(window.location.hash, checkPath, 'back to the start');
  });
  window.history.back();
});

test('pushing the same path without state', { timeout: 3000 }, t => {
  t.plan(8);

  // get to a known state
  getHistory().push('push-without-state');
  t.equals(window.location.hash, `#/push-without-state`, 'inital hash updated');

  // push the url once
  const targetPath = 'push1';
  getHistory().push(targetPath);
  t.equals(window.location.hash, `#/${targetPath}`, 'navigation successful');
  t.notOk(getState().state, 'state is empty');

  // push the same url with new state
  getHistory().push(targetPath, getUniqeState());
  t.equals(window.location.hash, `#/${targetPath}`, 'hash location is the same');
  t.ok(getState().state, 'state is now set');

  // confirm that going back loads the first route (without state)
  listenOnce((location, action) => {
    const checkPath = isBrokenBrowser ? '#/' : `#/${targetPath}`;
    t.equals(action, 'POP', 'popstate listener is called');
    t.equals(window.location.hash, checkPath, 'navigation successful');
    t.notOk(getState().state, 'state is empty');
  });
  window.history.back();
});

test('pushing the same path with state', { timeout: 3000 }, t => {
  t.plan(8);

  // get to a known state (add two history entries, the second will be relaced)
  getHistory().push('push-with-state');
  t.equals(window.location.hash, `#/push-with-state`, 'inital hash updated');

  // push the url once
  const targetPath = 'push2';
  const firstState = getUniqeState();
  getHistory().push(targetPath, firstState);
  t.equals(window.location.hash, `#/${targetPath}`, 'navigation successful');
  t.deepEqual(getState().state, firstState, 'state is set');

  // push the same url with new state
  getHistory().push(targetPath, getUniqeState());
  t.equals(window.location.hash, `#/${targetPath}`, 'hash location is the same');
  t.notDeepEqual(getState().state, firstState, 'state is updated');

  // confirm that going back takes us to the first pushed route
  listenOnce((location, action) => {
    const checkPath = isBrokenBrowser ? '#/' : `#/${targetPath}`;
    t.deepEqual(getState().state, firstState, 'first state restored');
    t.equals(action, 'POP', 'popstate listener is called');
    t.equals(window.location.hash, checkPath, 'back to the start');
  });
  window.history.back();
});
