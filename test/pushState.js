import test from 'tape-rollup';
import getHistory from './lib/getHistory';
import guid from './lib/guid';

test('supports push route with state', t => {
  t.plan(5);
  const PATH = guid();
  const STATE = { time: new Date().toString() };

  t.equals(window.location.hash, '#/', 'URL hash is set');
  t.notOk(window.history.state, 'state is empty');

  getHistory().push(PATH, STATE);
  t.equals(window.location.hash, `#/${PATH}`, 'URL is updated');
  t.equals(typeof window.history.state.key, 'string', 'state.key is a string');
  t.deepEquals(window.history.state.state, STATE, 'state.state is set value');
});

test('supports push route without state', t => {
  t.plan(3);
  const PATH = guid();

  getHistory().push(PATH);
  const { key, state } = window.history.state;
  t.equals(window.location.hash, `#/${PATH}`, 'URL is updated');
  t.equals(typeof key, 'string', 'state has a key');
  t.notOk(state, 'state is empty');
});

test('restores state on back button', t => {
  t.plan(5);

  t.equals(typeof window.history.state.key, 'string', 'history state has key');
  t.notOk(window.history.state.state, 'history state is empty');

  const unlisten = getHistory().listen((location, action) => {
    t.equals(action, 'POP', 'popstate listener is called');
    t.ok(window.history.state.state, 'state is no longer empty');
    t.ok(location.state, 'location object state is no longer empty');
    unlisten();
  });

  // browser back button should trigger listener
  window.history.back();
});

// test('supports replace route with state', t => {
//   t.plan(5);
//   const PATH = 'test2';
//   const STATE = { time: new Date().toString() };

//   history.push(PATH, STATE);

//   history.replace(PATH, STATE);
//   t.equals(window.location.hash, `#/${PATH}`, 'URL is updated');
//   t.equals(typeof window.history.state.key, 'string', 'state.key is a string');
//   t.deepEquals(window.history.state.state, STATE, 'state.state is set value');
// });
