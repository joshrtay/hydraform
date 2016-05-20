const hydraform = require('../../../..')

module.exports = {
  "module": {
    "foo": {
      "src": hydraform('foo', {fooBucket: 'woot'})
    }
  }
}
