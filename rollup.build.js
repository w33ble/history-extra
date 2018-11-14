require('dotenv').config();
const fs = require('fs');
const babel = require('rollup-plugin-babel');
const builtins = require('rollup-plugin-node-builtins');
const commonjs = require('rollup-plugin-commonjs');
const globals = require('rollup-plugin-node-globals');
const resolve = require('rollup-plugin-node-resolve');
const pkg = require('./package.json');

const license = fs.readFileSync('./LICENSE', 'utf-8').replace(/\n/g, '\n* ');

const banner = `/*
* ${pkg.name} version ${pkg.version}
*
* ${license.replace('\r\n', '')}
*/
`;

module.exports = {
  input: 'src/createHashStateHistory.js',
  output: [
    {
      format: 'umd',
      name: 'history',
      dir: 'dist',
      file: 'createHashStateHistory.js',
      sourcemap: true,
      globals: {
        'history/LocationUtils': 'LocationUtils',
        'history/PathUtils': 'PathUtils',
        'history/createTransitionManager': 'createTransitionManager',
        'history/DOMUtils': 'DOMUtils',
      },
      banner,
    },
    {
      format: 'es',
      dir: 'dist',
      file: 'createHashStateHistory.mjs',
      sourcemap: true,
      banner,
    },
  ],
  external: id => /history/.test(id),
  plugins: [
    commonjs(),
    globals(),
    builtins(),
    resolve({
      browser: true,
      jsnext: true,
    }),
    babel({
      exclude: ['node_modules/**'],
    }),
  ],
};
