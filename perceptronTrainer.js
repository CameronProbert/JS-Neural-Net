const _ = require('lodash')

const Perceptron = require('./perceptron')
const SigmoidNeuron = require('./sigmoidNeuron')

const maxIterations = 100000000
const printInterval = 5000000
let a = _.random(-2, 2, true)
let b = _.random(-50, 50)

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

function train (perceptron) {
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
      console.log(`Correct: ${numCorrect}/${i + 1}\t\t Last ${printInterval} correct: ${((numCorrect - lastCorrect) / printInterval * 100).toFixed(3)}%`)
      console.log(perceptron.weightsToString())
      lastCorrect = numCorrect
    }

    const difference = expected - actual
    const learningRate = 0.5 - (0.5 * (i / maxIterations))
    perceptron.adjust(point, difference, learningRate)
  }
  return numCorrect
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
    neuronType = typeof neuron
    numCorrect.push(train(neuron))
  }
  console.log(`Average of ${neuronsToTrain} repetitions for a ${neuronType}:
    ${numCorrect.reduce((sum, item) => sum + item, 0) / neuronsToTrain}`)
}

module.exports = {
  trainNeuron
}
