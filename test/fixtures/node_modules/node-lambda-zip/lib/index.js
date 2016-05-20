/**
 * Modules
 */

const prosh = require('prosh')
const {join} = require('path')

/**
 * Expose
 */

module.exports = nodeLambdaZip

/**
 * node-lambda-zip
 */

function nodeLambdaZip (src, out, opts = {}) {
  const entry = opts.entry || 'index.js'
  const name = opts.name || 'default'
  let touch = opts.touch || []
  touch = [join(src, 'build.js'), ...touch].join(' ')
  return prosh(`
      browserify --node -s ${name} --im -o ${src}/build.js ${src}/${entry}
      touch -t 197101010000 ${touch}
      zip -X ${out} ${src}/*`, {cwd: opts.cwd}).then(_ => out)

}
