
# hydraform

[![Build status][travis-image]][travis-url]
[![Git tag][git-image]][git-url]
[![NPM version][npm-image]][npm-url]
[![Code style][standard-image]][standard-url]

Build tool and npm module management for terraform.

## Installation

    $ npm install hydraform -g

## Setup

Create a module by running `npm init` and then placing terraform files in a `hydra` directory. Then just use npm to install modules.

## Build step

Hydraform builds [name].tf.js files that export an object into [name]_override.tf.json files. .tf.js can embed functions in the object. These functions are passed the opts that are passed to hydraform. The hydra directory along with the built files is place in the `hydra_modules` directory.


## Usage

In any directory with a hydra dir a package.json you can run.

terraform apply $(hydraform)

## API

### hydraform(module, opts)

- `module` - npm module name for a hydra package to include
- `opts` - options to pass to .tf.js files in hydra directory

## License

MIT

[travis-image]: https://img.shields.io/travis/joshrtay/hydraform.svg?style=flat-square
[travis-url]: https://travis-ci.org/joshrtay/hydraform
[git-image]: https://img.shields.io/github/tag/joshrtay/hydraform.svg?style=flat-square
[git-url]: https://github.com/joshrtay/hydraform
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
[npm-image]: https://img.shields.io/npm/v/hydraform.svg?style=flat-square
[npm-url]: https://npmjs.org/package/hydraform
