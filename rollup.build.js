const fs = require('fs');
const babel = require('rollup-plugin-babel');
const config = require('./rollup.common');
const pkg = require('./package.json');

const license = fs.readFileSync('./LICENSE', 'utf-8').replace(/\n/g, '\n* ');

const banner = `/*
* ${pkg.name} version ${pkg.version}
*
* ${license.replace('\r\n', '')}
*/
`;

module.exports = {
  ...config,
  input: 'src/createHashStateHistory.js',
  output: [
    {
      format: 'umd',
      name: 'history',
      dir: 'dist',
      file: 'createHashStateHistory.js',
      sourcemap: true,
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
  external: ['history'],
  plugins: config.plugins.concat([
    babel({
      exclude: ['node_modules/**'],
    }),
  ]),
};
