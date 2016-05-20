/**
 * Imports
 */

const {spawn} = require('child_process')
const {join} = require('path')
const co = require('co')
const assign = require('@f/assign')

let findModules = require('find-mod')

findModules = co.wrap(findModules)

/**
 * Exports
 */

module.exports = prosh

/**
 * prosh
 */

function prosh (command, options = {}) {
  const cwd = options.cwd || process.cwd()
  return findModules(cwd).then(node_modules_dir => {
    const env = assign({}, process.env, {PATH: `${process.env.PATH}:${join(node_modules_dir, 'node_modules/.bin')}`}, options.env)

    return new Promise(function (resolve, reject) {
      let proc = spawn('/bin/sh', ['-c', command], {stdio: options.capture ? 'pipe' : 'inherit', cwd, env})
      let stdout = ''
      let stderr = ''

      proc.on('error', reject)
      proc.on('close', (code) => {
        if (code === 0) {
          resolve(stdout)
        } else {
          reject(stderr)
        }
      })

      if (!options.capture) return

      proc.stdout.on('data', (chunk) => {
        process.stdout.write(chunk)
        stdout += chunk
      })
      proc.stderr.on('data', (chunk) => {
        process.stderr.write(chunk)
        stderr += chunk
      })
    })
  })

}
