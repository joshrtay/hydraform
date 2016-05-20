/**
 * Imports
 */

const test = require('tape')
const prosh = require('../')

/**
 * Tests
 */

const capture = true

test('should echo and consume', (t) => {
  prosh('echo "hello world"', {capture}).then((stdout) => {
    t.equal(stdout, 'hello world\n')
    t.end()
  }).catch(err => console.log('error', err))
})

test('should multi line echo and consume', (t) => {
  prosh('echo "hello world"\necho "hello world"', {capture}).then((stdout) => {
    t.equal(stdout, 'hello world\nhello world\n')
    t.end()
  })
})

test('should echo', (t) => {
  prosh('echo "hello world"').then(stdout => {
    t.equal(stdout, '')
    t.end()
  })
})
