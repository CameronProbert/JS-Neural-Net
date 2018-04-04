const sigmoid = require('sigmoid')

const Perceptron = require('./perceptron')

function run (input) {
  console.log(sigmoid(input))
}

function testPerceptron (data) {
  console.log('Data is:', data)
}

module.exports = {
  run,
  testPerceptron
}
