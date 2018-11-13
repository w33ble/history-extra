require('dotenv').config();
const babel = require('rollup-plugin-babel');
const builtins = require('rollup-plugin-node-builtins');
const commonjs = require('rollup-plugin-commonjs');
const globals = require('rollup-plugin-node-globals');
const istanbul = require('rollup-plugin-istanbul');
const resolve = require('rollup-plugin-node-resolve');

module.exports = {
  output: {
    format: 'iife',
    name: 'history',
    sourcemap: 'inline',
  },
  plugins: [
    commonjs(),
    globals(),
    builtins(),
    resolve({
      browser: true,
      jsnext: true,
    }),
    istanbul({
      include: ['./src/**/*.{js,mjs}'],
    }),
    babel({
      exclude: ['node_modules/**'],
    }),
  ],
};
