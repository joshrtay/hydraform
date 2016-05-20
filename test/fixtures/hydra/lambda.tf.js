const {resolve, join} = require('path')
const zip = require('node-lambda-zip')

module.exports = {
  resource: {
    function: {
      filename: function * () {
        return yield zip('function', 'lambda.zip', {cwd: __dirname})
      },
      function_name: "funky",
      role: "${aws_iam_role.lambda_function.arn}",
      handler: "build.default",
      source_code_hash: '${base64sha256(file("${path.module}/lambda.zip"))}'
    }
  }
}
