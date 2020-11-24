# Backoff

[![NPM](https://img.shields.io/npm/v/@alvarocastro/backoff)](https://www.npmjs.com/package/@alvarocastro/backoff)
[![Build status](https://img.shields.io/github/workflow/status/alvarocastro/backoff/build)](https://github.com/alvarocastro/backoff/actions?query=workflow%3Abuild)
[![Maintainability status](https://img.shields.io/codeclimate/maintainability/alvarocastro/backoff)](https://codeclimate.com/github/alvarocastro/backoff/maintainability)
[![Coverage status](https://img.shields.io/coveralls/github/alvarocastro/backoff)](https://coveralls.io/github/alvarocastro/backoff?branch=master)
[![Bundle size](https://img.shields.io/bundlephobia/min/@alvarocastro/backoff)](https://bundlephobia.com/result?p=@alvarocastro/backoff)
[![Code style: XO](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo)
[![Release: Semantic](https://img.shields.io/badge/%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

A simple implementation of a backoff utility.

- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)

## Install

```bash
npm install @alvarocastro/backoff
```

## Usage

```js
const Backoff = require('@alvarocastro/backoff');
const backoff = new Backoff();

const connect = function () {
	console.log('Connecting...');
	const rand = Math.random();

	if (rand < 0.2) {
		console.log('Success!');
		backoff.reset();
		return true;
	}
	
	const delay = backoff.duration();
	console.log(`Failed. Retrying in ${delay}ms`);
	setTimeout(function () {
		connect();
	}, delay);
};

connect();
```

### Backoff(options = {min: 1000, max: 60000, factor: 2, jitter: 0})

Receives an optional `options` object.

#### options.min

Type: `Number`<br>
Default: 1000

Minimum duration.

#### options.max

Type: `Number`<br>
Default: 6000

Maximum duration.

#### options.factor

Type: `Number`<br>
Default: 2

Factor in which the duration increases each time.

#### options.jitter

Type: `Number`<br>
Default: 0

Randomizes the duration. For example with a value of `0.5` the initial default duration will be between 500 and 1500.
The randomization when used in a reconnection helps smooth the load induced by the reconnection attempts of multiple clients, in case a server goes down.
Use `0` for no randomization.

### duration()

Returns the next time to wait in milliseconds.

### reset()

Resets the internal attempts count, bringing the next `duration()` time back to the starting value.

## Contributing

Contributions are always welcome! Please run `npm test` beforehand to ensure everything is ok.

## Support

If you use this package please consider starring it :)
