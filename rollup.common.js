require('dotenv').config();
const builtins = require('rollup-plugin-node-builtins');
const commonjs = require('rollup-plugin-commonjs');
const globals = require('rollup-plugin-node-globals');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  plugins: [
    commonjs(),
    globals(),
    builtins(),
    resolve({
      browser: true,
      jsnext: true,
      module: true,
    }),
  ],
};
