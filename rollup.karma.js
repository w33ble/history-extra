const istanbul = require('rollup-plugin-istanbul');
const babel = require('rollup-plugin-babel');
const config = require('./rollup.common');

module.exports = {
  ...config,
  output: {
    format: 'iife',
    name: 'history',
    sourcemap: 'inline',
  },
  plugins: config.plugins.concat([
    istanbul({
      exclude: ['test/**/*.js', 'node_modules/**'],
    }),
    babel(),
  ]),
};
