const _ = require('lodash')
const sigmoid = require('sigmoid')

const Perceptron = require('./perceptron')

/**
 * Creates a new Sigmoid Neuron with no data
 * @param {Integer} numInputs the number of inputs for the Sigmoid Neuron to have
 */
class SigmoidNeuron extends Perceptron {
  process (inputs) {
    let sum = this.bias
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.weights[i]
    }
    return toBinary(sigmoid(sum))
  }
}

/**
 * Converts the input to binary. 0 if less than 0, else 1
 * @param {Number} input the input to test
 */
const toBinary = input => input < 0.5 ? 0 : 1

module.exports = SigmoidNeuron
