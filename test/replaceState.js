import test from 'tape-rollup';
import getHistory from './lib/getHistory';
import { guid } from './lib/utils';

let initialHref;

test('create and capture initial url', { timeout: 3000 }, t => {
  t.plan(1);
  initialHref = window.location.href;
  getHistory().push(`replace-${guid()}`);
  const currentHref = window.location.href;
  t.notEquals(currentHref, initialHref, 'href updated and captured');
});

test('supports replace route with state', { timeout: 3000 }, t => {
  t.plan(3);
  const PATH = guid();
  const STATE = { time: new Date().toString() };

  getHistory().replace(PATH, STATE);
  t.equals(window.location.hash, `#/${PATH}`, 'URL is updated');
  t.equals(typeof window.history.state.key, 'string', 'state.key is a string');
  t.deepEquals(window.history.state.state, STATE, 'state.state is set value');
});

test('supports replace route without state', { timeout: 3000 }, t => {
  t.plan(3);
  const PATH = guid();

  getHistory().replace(PATH);
  const { key, state } = window.history.state;
  t.equals(window.location.hash, `#/${PATH}`, 'URL is updated');
  t.equals(typeof key, 'string', 'state has a key');
  t.notOk(state, 'state is empty');
});

test('restores state on back button', { timeout: 3000 }, t => {
  t.plan(4);

  t.equals(typeof window.history.state.key, 'string', 'history state has key');
  t.notOk(window.history.state.state, 'history state is empty');

  const unlisten = getHistory().listen((location, action) => {
    t.equals(action, 'POP', 'popstate listener is called');
    t.equals(window.location.href, initialHref, 'back button goes back to right url');
    unlisten();
  });

  // browser back button should trigger listener
  window.history.back();
});
