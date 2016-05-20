/**
 * Modules
 */

const fs = require('mz/fs')
const {join, resolve, basename, dirname} = require('path')
const sonit = require('sonit')
const hasha = require('hasha')
const lambdaJSON = require('lambda-json')
const prosh = require('prosh')
const findNodeModules = require('find-node-modules')
const rimraf = require('rimraf')
const defaults = require('@f/defaults')

/**
 * Paths
 */

const MOD_DIR = 'hydra'

/**
 * Expose
 */

module.exports = hydraform


let CWD
let buildDir

/**
 * hydraform
 */

function * hydraform (mod='', opts = {}) {
  if (!CWD) {
    CWD = opts.cwd || process.cwd()
    buildDir = join(CWD, opts.buildDir || 'hydra_modules')
    if (yield fs.exists(buildDir)) {
      rimraf.sync(join(buildDir, '*'))
    } else {
      yield fs.mkdir(buildDir)
    }

  }
  delete opts.cwd

  const nodeModDir = findNodeModules({cwd: CWD, relative: false})[0]
  let modDir
  if (mod) {
    modDir = join(nodeModDir, mod)
  } else {
    modDir = dirname(nodeModDir)
  }

  let modJSON = JSON.parse(fs.readFileSync(join(modDir, 'package.json')))
  let hydraJSON = modJSON.hydra
  const src = join(modDir, hydraJSON && hydraJSON.dir || MOD_DIR)

  opts = (hydraJSON && hydraJSON.defaults) ? defaults(opts, hydraJSON.defaults) : opts
  const name = modJSON.name

  const fileNames = (fs.readdirSync(src)).map(file => basename(file))
  const dynamics = fileNames.filter(file => file.endsWith('.tf.js'))

  const overrides = dynamics.map(file => `${basename(file, '.tf.js')}_override.tf.json`)
  const sha1 = hasha(JSON.stringify(opts), {algorithm: 'sha1'})
  const dir = [name, sha1].join('-')
  const fullPath = join(buildDir, dir)

  if (yield fs.exists(fullPath)) {
    yield prosh(`rm -rf ${fullPath}`)
  }
  yield fs.mkdir(fullPath)
  yield prosh(`cp -r ${src}/* ${fullPath}`)

  const lambdaJSONS = dynamics.map(file => require(join(fullPath, file)))
  yield (yield lambdaJSONS.map((l, idx) => {
    return lambdaJSON(l, opts)
  }))
  .map((json, idx) => {
    return sonit(join(fullPath, overrides[idx]), json)
  })
  return fullPath
}
