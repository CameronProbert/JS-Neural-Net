import _ from 'lodash'

/**
 * Creates a new Perceptron with no data
 * @param {Integer} numInputs the number of inputs for the perceptron to have
 */
export default class Perceptron {
  weights: number[] = [];
  bias: number = randomiseBias();

  constructor (numInputs: number) {
    // Set up variables
    this.weights = randomiseWeights(numInputs)
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

  process (inputs: number[]) {
    let sum = this.bias
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.weights[i]
    }
    const heavisideVal = heaviside(sum)
    return {output: heavisideVal, delta: heavisideVal}
  }

  adjust (inputs: any[], difference: number, learningRate: number) {
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
const heaviside = (input: number) => input < 0 ? 0 : 1

function randomiseWeights(numInputs: number) {
  const weights = []
  for (let i = 0; i < numInputs; i++) {
    weights.push(_.random(-1, 1, true))
  }
  return weights
}

function randomiseBias() {
  const bias = _.random(-1, 1, true)
  return bias
}
