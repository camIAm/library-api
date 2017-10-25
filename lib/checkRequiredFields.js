const { difference, keys } = require('ramda')

module.exports = (requiredKeys, body) => difference(requiredKeys, keys(body))
