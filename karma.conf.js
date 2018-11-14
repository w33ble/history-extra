const { name: projectName, version: projectVersion } = require('./package.json');
const rollupConfig = require('./rollup.karma.js');

const isTravis = Boolean(process.env.TRAVIS);
const isDev = Boolean(process.env.DEV);
const launchers = process.env.KARMA_LAUNCHERS;

module.exports = function karmaConfig(config) {
  const customLaunchers = {
    SL_Explorer: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      version: '11',
      platform: 'Windows 8.1',
    },
    SL_Chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
    },
    SL_Firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
    },
    SL_Safari: {
      base: 'SauceLabs',
      browserName: 'safari',
      version: '9',
      platform: 'OS X 10.11',
    },
  };

  const browsers = isTravis
    ? Object.keys(customLaunchers).filter(l => !launchers || launchers.split(',').includes(l))
    : ['Chrome'];

  const browserSettings = {
    browserConsoleLogOptions: {
      level: config.LOG_WARN,
    },
    browserDisconnectTimeout: 30000,
    browserDisconnectTolerance: 2,
    browserNoActivityTimeout: 60000,
    captureTimeout: 60000,
  };

  config.set({
    frameworks: ['tap'],
    files: ['test/index.js'],
    preprocessors: {
      'test/**.{js,mjs}': ['rollup'],
      'src/**.{js,mjs}': ['rollup'],
    },
    autoWatch: isDev,
    singleRun: !isDev,
    customLaunchers,
    browsers,
    sauceLabs: {
      build: process.env.TRAVIS_BUILD_NUMBER || projectVersion,
      testName: process.env.TRAVIS_JOB_NUMBER
        ? `${projectName}-travis-${process.env.TRAVIS_JOB_NUMBER}`
        : projectName,
      recordScreenshots: false,
    },
    logLevel: config.LOG_WARN,
    ...browserSettings,
    reporters: ['progress', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      dir: 'coverage',
      'report-config': {
        html: {
          subdir: 'html',
        },
      },
    },
    rollupPreprocessor: rollupConfig,
  });
};
