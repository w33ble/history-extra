const istanbul = require('rollup-plugin-istanbul');
const config = require('./rollup.common');

module.exports = {
  ...config,
  output: {
    format: 'iife',
    name: 'history',
    sourcemap: 'inline',
  },
  plugins: config.plugins.slice(0, -1).concat([
    istanbul({
      exclude: ['test/**/*.js', 'node_modules/**'],
    }),
    config.plugins.slice(-1),
  ]),
};
