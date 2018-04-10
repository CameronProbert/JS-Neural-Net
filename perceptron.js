/**
 * Creates a new Perceptron with no data
 * @param {Integer} numInputs the number of inputs for the perceptron to have
 */
class Perceptron {
  constructor (numInputs) {
    // Set up variables
    this.weights = randomiseWeights(numInputs)
    this.bias = randomiseBias()

    // Bind functions
    this.toString = this.toString.bind(this)
    this.process = this.process.bind(this)
    this.adjust = this.adjust.bind(this)
  }

  toString () {
    let stringBuilder = 'Perceptron:\n'
    stringBuilder += 'Weights: ' + this.weights + '\n'
    stringBuilder += 'Bias: ' + this.bias
    return stringBuilder
  }

  process (inputs) {
    let sum = 0
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.weights[i]
    }
    return heaviside(sum)
  }

  adjust (inputs, difference, learningRate) {
    for (let i = 0; i < inputs.length; i++) {
      this.weights[i] += inputs[i] * difference * learningRate
    }
  }
}

/**
 * Converts the input to binary. 0 if less than 0, else 1
 * @param {Number} input the input to test
 */
const heaviside = input => input < 0 ? 0 : 1

/* Perceptron.prototype.toString = () => {
  let stringBuilder = 'Perceptron:\n'
  stringBuilder += 'Weights: ' + this.weights + '\n'
  stringBuilder += 'Bias: ' + this.bias
  return stringBuilder
} */

/**
 * Processes inputs and returns a binary value as output
 * @param {*} inputs The array of inputs to process in the perceptron. This
 * should be the same length as the weights array
 */
/* Perceptron.prototype.process = inputs => {
  let sum = 0
  for (let i = 0; i < inputs.length; i++) {
    sum += inputs[i] * this.weights[i]
  }
  return heaviside(sum)
} */

/**
 * Adjusts the weighting of the perceptron
 * @param {[*]} inputs
 * @param {*} change
 * @param {Number} learningRate
 */
/* Perceptron.prototype.adjust = (inputs, difference, learningRate) => {
  for (let i = 0; i < inputs.length; i++) {
    this.weights[i] += inputs[i] * difference * learningRate
  }
} */

function randomiseWeights (numInputs) {
  const weights = []
  for (let i = 0; i < numInputs; i++) {
    weights.push((Math.random() * 2) - 1)
  }
  return weights
}

function randomiseBias () {
  const bias = (Math.random() * 2) - 1
  return bias
}

module.exports = Perceptron
