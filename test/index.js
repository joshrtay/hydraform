/**
 * Imports
 */

const test = require('tape')
const hydraform = require('..')
const co = require('co')
const fs = require('mz/fs')
const {join} = require('path')

/**
 * Tests
 */

test('should build lambda jsons and deps', co.wrap(function * (t) {

  const dir = yield hydraform('', {cwd: __dirname + '/fixtures'})
  const lambda_tf_json = JSON.parse(yield fs.readFile(join(dir, 'lambda_override.tf.json')))
  t.deepEqual(lambda_tf_json, {
    "resource": {
      "function": {
        "filename": "lambda.zip",
        "function_name": "funky",
        "role": "${aws_iam_role.lambda_function.arn}",
        "handler": "build.default",
        "source_code_hash": "${base64sha256(file(\"${path.module}/lambda.zip\"))}"
      }
    }
  })
  const main_tf_json = JSON.parse(yield fs.readFile(join(dir, 'main_override.tf.json')))
  const mod = main_tf_json.module.foo.src
  const foo_tf_json = JSON.parse(yield fs.readFile(join(mod, 'foo_override.tf.json')))
  t.deepEqual(foo_tf_json, {
    "resource": {
      "aws_s3_bucket": {
        "foo": {
          "bucket": "woot"
        }
      }
    }
  })
  t.end()

}))
