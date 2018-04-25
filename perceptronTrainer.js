const _ = require('lodash')

const Perceptron = require('./perceptron')
const SigmoidNeuron = require('./sigmoidNeuron')

<<<<<<< HEAD
const maxIterations = 100000
=======
const maxIterations = 1000000
>>>>>>> 1cb61ebdac9fd4492ee778e18a549e80579a756b
const printInterval = 50000
let a = _.random(-2, 2, true)
let b = _.random(-50, 50)
const learningRateMax = 3

/**
 * Returns the y value of the function ax + b
 * @param {*} x The x co-ordinate value of the graph
 */
function test (x) {
  return a * x + b
}

function isAboveLine (x, y) {
  return test(x) < y ? 0 : 1
}

function train (perceptron, debugMode) {
  let numCorrect = 0
  let lastCorrect = 0
  for (let i = 0; i < maxIterations; i++) {
    const point = [
      _.random(-100, 100),
      _.random(-100, 100)
    ]

    const actual = perceptron.process(point)
    const expected = isAboveLine(point[0], point[1])
    if (actual === expected) numCorrect++
    if ((i + 1) % printInterval === 0) {
<<<<<<< HEAD
      // console.log(`Correct: ${numCorrect}/${i + 1}\t\t Last ${printInterval} correct: ${((numCorrect - lastCorrect) / printInterval * 100).toFixed(3)}%`)
      // console.log(perceptron.weightsToString())
=======
      if (debugMode) {
        console.log(`Correct: ${numCorrect}/${i + 1}\t\t Last ${printInterval} correct: ${((numCorrect - lastCorrect) / printInterval * 100).toFixed(3)}%`)
        console.log(perceptron.weightsToString())
      }
>>>>>>> 1cb61ebdac9fd4492ee778e18a549e80579a756b
      lastCorrect = numCorrect
    }

    const difference = expected - actual
<<<<<<< HEAD
    const learningRate = 0.1 - (0.1 * (i / maxIterations))
=======
    const learningRate = learningRateMax - (learningRateMax * (i / maxIterations))
>>>>>>> 1cb61ebdac9fd4492ee778e18a549e80579a756b
    perceptron.adjust(point, difference, learningRate)
  }
  return lastCorrect
}

function trainNeuron (neuronsToTrain, isSigmoid) {
  const numCorrect = []
  let neuronType = null
  for (let i = 0; i < neuronsToTrain; i++) {
    a = _.random(-2, 2, true)
    b = _.random(-50, 50)
    // console.log(`Gradient is: ${a.toFixed(2)}x + ${b}`)
    let neuron = {}
    if (isSigmoid) neuron = new SigmoidNeuron(2)
    else neuron = new Perceptron(2)
    neuronType = neuron.constructor.name
<<<<<<< HEAD
    numCorrect.push(train(neuron))
=======
    numCorrect.push(train(neuron, neuronsToTrain === 1))
>>>>>>> 1cb61ebdac9fd4492ee778e18a549e80579a756b
  }
  console.log(`Average of ${neuronsToTrain} repetitions for a ${neuronType}:
    ${numCorrect.reduce((sum, item) => sum + item, 0) / neuronsToTrain}`)
}

module.exports = {
  trainNeuron
}
