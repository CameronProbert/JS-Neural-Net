const _ = require('lodash')

/**
 * Creates a new Perceptron with no data
 * @param {Integer} numInputs the number of inputs for the perceptron to have
 */
class Perceptron {
  constructor (numInputs, weights, bias) {
    // Set up variables
    this.weights = weights || randomiseWeights(numInputs)
    this.bias = bias || randomiseBias()
  }

  toString () {
    let stringBuilder = 'Perceptron:\n'
    stringBuilder += 'Weights: ' + this.weights + '\n'
    stringBuilder += 'Bias: ' + this.bias
    return stringBuilder
  }

  weightsToString () {
    return this.weights.map(weight => {
      return weight.toFixed(3)
    }).join()
  }

  process (inputs) {
    let sum = this.bias
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.weights[i]
    }
    return heaviside(sum)
  }

  adjust (inputs, difference, learningRate) {
    for (let i = 0; i < inputs.length; i++) {
      this.weights[i] += (inputs[i] * difference * learningRate)
    }
    this.bias += (difference * learningRate)
  }
}

/**
 * Converts the input to binary. 0 if less than 0, else 1
 * @param {Number} input the input to test
 */
const heaviside = input => input < 0 ? 0 : 1

function randomiseWeights (numInputs) {
  const weights = []
  for (let i = 0; i < numInputs; i++) {
    weights.push(_.random(-1, 1, true))
  }
  return weights
}

function randomiseBias () {
  const bias = _.random(-1, 1, true)
  return bias
}

module.exports = Perceptron
