/**
 * Creates a new Perceptron with no data
 * @param {Integer} numInputs the number of inputs for the perceptron to have
 */
function Perceptron (numInputs) {
  this.weights = randomiseWeights(numInputs)
  this.bias = randomiseBias()
}

/**
 * Converts the input to binary. 0 if less than 0, else 1
 * @param {Number} input the input to test
 */
Perceptron.prototype.heaviside = input => input < 0 ? 0 : 1

/**
 * Processes inputs and returns a binary value as output
 * @param {*} inputs The array of inputs to process in the perceptron. This
 * should be the same length as the weights array
 */
Perceptron.prototype.process = inputs => {
  let sum = 0
  for (let i = 0; i < inputs.length; i++) {
    sum += inputs[i] * this.weights[i]
  }
  return this.heaviside(sum)
}

/**
 * Adjusts the weighting of the perceptron
 * @param {[*]} inputs
 * @param {*} change
 * @param {Number} learningRate
 */
Perceptron.prototype.adjust = (inputs, change, learningRate) => {
  for (let i = 0; i < inputs.length; i++) {
    this.weights[i] += inputs[i] * change * learningRate
  }
}

function randomiseWeights (numInputs) {
  const weights = []
  for (let i = 0; i < numInputs; i++) {
    weights.push((Math.random() * 2) - 1)
  }
  return weights
}

function randomiseBias () {
  return (Math.random * 2) - 1
}

module.exports = Perceptron
