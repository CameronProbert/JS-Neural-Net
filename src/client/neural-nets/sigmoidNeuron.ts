import _ from 'lodash'
import sigmoid from 'sigmoid'

import Perceptron from './perceptron'

/**
 * Creates a new Sigmoid Neuron with no data
 * @param {Integer} numInputs the number of inputs for the Sigmoid Neuron to have
 */
export default class SigmoidNeuron extends Perceptron {
  process (inputs: any[]) {
    let sum = this.bias
    for (let i = 0; i < inputs.length; i++) {
      sum += inputs[i] * this.weights[i]
    }
    const sigmoidVal = sigmoid(sum)
    return {output: toBinary(sigmoidVal), delta: sigmoidVal}
  }
}

/**
 * Converts the input to binary. 0 if less than 0, else 1
 * @param {Number} input the input to test
 */
const toBinary = (input: number) => input < 0.5 ? 0 : 1
