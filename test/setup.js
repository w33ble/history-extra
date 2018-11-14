import test from 'tape-rollup';
import getHistory from './lib/getHistory';

test('browser supports console.warn', t => {
  t.plan(1);
  t.equals(typeof console.warn, 'function', 'console.warn is a function');
});

test('updates URL on load', t => {
  t.plan(2);

  // confirm location has no hash
  t.equals(window.location.hash, '', 'URL hash is not set');

  // creating history instance should update the URL with a hash
  getHistory();
  t.equals(window.location.hash, '#/', 'URL hash is set');
});
