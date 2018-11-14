# history-extra

Extra functionality for the [history](https://github.com/ReactTraining/history) module.

[![Build Status](https://travis-ci.org/w33ble/history-extra.svg?branch=master)](https://travis-ci.org/w33ble/history-extra)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/w33ble/history-extra/master/LICENSE)
[![npm](https://img.shields.io/npm/v/history-extra.svg)](https://www.npmjs.com/package/history-extra)
[![Project Status](https://img.shields.io/badge/status-stable-brightgreen.svg)](https://nodejs.org/api/documentation.html#documentation_stability_index)

## Usage

```
yarn add history history-extra
```

`history` is a peer dependency, and must be installed along side `history-extra`.

## Versions

The major version of `history-extra` should be compatible with the upstream `history` module with the same major version.

So far, it's only been tested with `^4.7.0` and newer.

## Methods

### `createHashStateHistory`

```
import { createHashStateHistory } from 'history-extra';
```

Works the same way that [createHashHistory in history](https://github.com/ReactTraining/history/blob/master/README.md#usage) works, except that it supports state.

#### Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs](https://saucelabs.com)

[![Testing Provided by Sauce Labs](sauce.png)](https://saucelabs.com/)

#### License

MIT © [w33ble](https://github.com/w33ble)
