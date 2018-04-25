const _ = require('lodash')

const Perceptron = require('./perceptron')
const SigmoidNeuron = require('./sigmoidNeuron')

const maxIterations = 10000 // How many points of training data to feed a neuron
const printInterval = 1000 // How often to print to the console and send data to the Display component

// Initial a and b for the straight line equation 'y = ax + b'
let a = _.random(-2, 2, true)
let b = _.random(-50, 50)

const learningRateMax = 3 // While training, learning rate starts at this and -> 0 as i -> maxIterations

/**
 * Returns the y value of the function ax + b
 * @param {Number} x The x co-ordinate value of the graph
 */
function test (x) {
  return a * x + b
}

/**
 * Returns whether mathematically the given x and y is above or below the line 'ax + b'
 * @param {Number} x The x-coordinate
 * @param {Number} y The y-coordinate
 */
function isAboveLine (x, y) {
  return test(x) < y ? 0 : 1
}

/**
 * Trains a neuron
 * @param {Neuron} neuron  The neuron to train
 * @param {Function([[x1, y1], ...])} percentCompleteFn Returns the percentage complete as a parameter to this function
 */
function train (neuron, percentCompleteFn, debugMode) {
  let numCorrect = 0
  let lastCorrect = 0
  const allPoints = []

  // Train the neuron maxIterations times
  for (let i = 0; i < maxIterations; i++) {
    // Creates a random 'x, y' point to feed the neuron
    const point = {
      x: _.random(-100, 100),
      y: _.random(-100, 100),
      toArray: function () { return [this.x, this.y] }
    }

    // Test whether the neuron thinks it is above or below the line
    const actual = neuron.process(point.toArray())
    // Test whether the point is actually above or below the line
    const expected = isAboveLine(point.x, point.y)

    // If correct, increment the numCorrect count
    if (actual === expected) numCorrect++

    // If 'i' is a multiple of 'printInterval'
    if ((i + 1) % printInterval === 0) {
      // Print debug statements
      if (debugMode) {
        console.log(`Correct: ${numCorrect}/${i + 1}\t\t Last ${printInterval} correct: ${((numCorrect - lastCorrect) / printInterval * 100).toFixed(3)}%`)
        console.log(neuron.weightsToString())
      }

      // Save the number correct until next print section
      lastCorrect = numCorrect
    }

    // Adjust the neuron's weights and bias
    const difference = expected - actual
    const learningRate = learningRateMax - (learningRateMax * (i / maxIterations))
    neuron = neuron.adjust(point.toArray(), difference, learningRate)

    point.expected = expected
    point.actual = actual
    allPoints.push(point)

    // If there is a given function to perform when certain tasks are complete, do it now
    if (percentCompleteFn && (i + 1) % printInterval === 0) {
      //console.log('Calling percent complete function')
      percentCompleteFn(allPoints)
    }
  }
  return {numCorrect, neuron}
}

/**
 * Trains 'neuronsToTrain' neurons, then returns a promise with the trained neuron
 * @param {[Number]} neuronsToTrain Number of neurons to train, default is 1
 * @param {[Number]} chosenA a, from the equation 'y = ax + b'
 * @param {[Number]} chosenB b, from the equation 'y = ax + b'
 * @param {[Function([[x1, y1], ...])]} percentCompleteFn Function to perform periodically
 * @param {[Boolean]} isSigmoid True -> SigmoidNeuron | False -> Perceptron
 *
 * @returns {Promise} Returns a promise containing an object with a neuron + the a & b it was trained for
 */
function trainNeuron (neuronsToTrain = 1, chosenA, chosenB, percentCompleteFn, isSigmoid) {
  return new Promise((resolve, reject) => {
    const numCorrect = []
    let neuronType = null
    let trainedNeuron = null
    for (let i = 0; i < neuronsToTrain; i++) {
      a = chosenA || _.random(-2, 2, true)
      b = chosenB || _.random(-50, 50)
      let neuron = {}
      if (isSigmoid) neuron = new SigmoidNeuron(2)
      else neuron = new Perceptron(2)
      neuronType = neuron.constructor.name
      trainedNeuron = train(neuron, percentCompleteFn, neuronsToTrain === 1)
      numCorrect.push(trainedNeuron.numCorrect)
      if (neuronsToTrain === 1) {
        resolve({ neuron: trainedNeuron.neuron, a, b })
      }
    }
    console.log(`Average of ${neuronsToTrain} repetitions for a ${neuronType}:
    ${numCorrect.reduce((sum, item) => sum + item, 0) / neuronsToTrain}`)
    reject(new Error('More than one neuron. If you were expecting this, don\'t worry about it.'))
  })
}

module.exports = {
  trainNeuron
}
