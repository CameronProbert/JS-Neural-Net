import _  from 'lodash';

import Perceptron from './perceptron';
import SigmoidNeuron from './sigmoidNeuron';
import { TestPoint } from './types';

const maxIterations = 10000 // How many points of training data to feed a neuron
const printInterval = 1000 // How often to print to the console and send data to the Display component

// Initial a and b for the straight line equation 'y = ax + b'
let a = _.random(-2, 2, true)
let b = _.random(-50, 50)

const learningRateMax = 1 // While training, learning rate starts at this and -> 0 as i -> maxIterations

/**
 * Returns the y value of the function ax + b
 * @param {Number} x The x co-ordinate value of the graph
 */
function calculateY(x: number): number {
  return a * x + b
}

/**
 * Returns whether mathematically the given x and y is above or below the line 'ax + b'
 * @param {Number} x The x-coordinate
 * @param {Number} y The y-coordinate
 */
function isAboveLine(x: number, y: number) {
  return calculateY(x) < y ? 0 : 1
}

/**
 * Trains a neutron
 * @param {Neutron} neutron  The neutron to train
 * @param {Function([[x1, y1], ...])} percentCompleteFn Returns the percentage complete as a parameter to this function
 */
function train(neutron: any, percentCompleteFn: null | ((results: TestPoint[]) => void), debugMode: boolean) {
  let numCorrect = 0
  let lastCorrect = 0
  const allPoints: TestPoint[] = []

  // Train the neuron maxIterations times
  for (let i = 0; i < maxIterations; i++) {
    // Creates a random 'x, y' point to feed the neuron
    const point: TestPoint = {
      x: _.random(-100, 100),
      y: _.random(-100, 100),
      toArray: function () { return [this.x, this.y] }
    }

    // Test whether the neuron thinks it is above or below the line
    const result: {output: 0 | 1, delta: number} = neutron.process(point.toArray())
    // Test whether the point is actually above or below the line
    const expected = isAboveLine(point.x, point.y)

    // If correct, increment the numCorrect count
    if (result.output === expected) numCorrect++

    // If 'i' is a multiple of 'printInterval'
    if ((i + 1) % printInterval === 0) {
      // Print debug statements
      if (debugMode) {
        console.log(`Correct: ${numCorrect}/${i + 1}\t\t Last ${printInterval} correct: ${((numCorrect - lastCorrect) / printInterval * 100).toFixed(3)}%`)
        console.log(neutron.weightsToString())
      }

      // Save the number correct until next print section
      lastCorrect = numCorrect
    }

    // Adjust the neuron's weights and bias
    const difference = expected - result.delta
    const learningRate = learningRateMax - (learningRateMax * (i / maxIterations))
    neutron.adjust(point.toArray(), difference, learningRate)

    point.expected = expected
    point.actual = result.output
    allPoints.push(point)

    // If there is a given function to perform when certain tasks are complete, do it now
    if (percentCompleteFn && (i + 1) % printInterval === 0) {
      console.log('Calling percent complete function')
      percentCompleteFn(allPoints)
    }
  }
  return numCorrect
}

/**
 * Trains 'neuronsToTrain' neurons, then returns a promise with the trained neuron
 * @param {[Number]} neuronsToTrain Number of neurons to train, default is 1
 * @param {[Number]} chosenA a, from the equation 'y = ax + b'
 * @param {[Number]} chosenB b, from the equation 'y = ax + b'
 * @param {[Function([[x1, y1], ...])]} percentCompleteFn Function to perform periodically
 * @param {[Boolean]} isSigmoid True -> SigmoidNeuron | False -> Perceptron
 *
 * @returns {Promise<any>} Returns a promise containing an object with a neuron + the a & b it was trained for
 */
function trainNeuron(neuronsToTrain: number, chosenA: number, chosenB: number, percentCompleteFn: null | ((results: TestPoint[]) => void), isSigmoid: boolean): Promise<any> {
  return new Promise((resolve, reject) => {
    const numCorrect = []
    let neuronType = null
    for (let i = 0; i < neuronsToTrain; i++) {
      a = chosenA || _.random(-2, 2, true)
      b = chosenB || _.random(-50, 50)
      let neuron = {}
      if (isSigmoid) neuron = new SigmoidNeuron(2)
      else neuron = new Perceptron(2)
      neuronType = (neuron.constructor as any).name
      numCorrect.push(train(neuron, percentCompleteFn, neuronsToTrain === 1))
      if (neuronsToTrain === 1) {
        resolve({ neuron, a, b })
      }
    }
    console.log(`Average of ${neuronsToTrain} repetitions for a ${neuronType}:
    ${numCorrect.reduce((sum, item) => sum + item, 0) / (neuronsToTrain as number)}`)
    reject(new Error('More than one neuron. If you were expecting this, don\'t worry about it.'))
  })
}

export default trainNeuron;
