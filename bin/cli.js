#!/usr/bin/env node

require('envitro')()

/**
 * Imports
 */

var optStack = require('opt-stack')
var co = require('co')

var hydraform = require('..')

var opts = optStack('hydra')
var cmd = process.argv[2]

main(cmd, opts)

function usage () {
  const usage = `
  Usage:
    hydra <...opts>

  Flags:
    --help Print usage
  `
  console.log(usage)
}

function main (cmd, opts) {
  if (opts.help) {
    usage()
    return
  }

  if (!cmd) {
    usage()
  }

  co(hydraform, '', opts).then(function (entry) {
    console.log(entry)
  })
}
