const _ = require('lodash')

const Perceptron = require('./perceptron')

const maxIterations = 1000000
const printInterval = 5000
const a = _.random(-2, 2, true)
const b = _.random(-50, 50)

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
      console.log(`Correct: ${numCorrect}/${i + 1}\t\t Difference: ${numCorrect - lastCorrect}`)
      console.log(perceptron.weightsToString())
      lastCorrect = numCorrect
    }
    const difference = expected - actual
    const learningRate = 1 - (i / maxIterations)
    perceptron.adjust(point, difference, learningRate)
  }
}

function trainPerceptron () {
  console.log(`Gradient is: ${a.toFixed(2)}x + ${b}`)
  const perceptron = new Perceptron(2)
  train(perceptron)
}

module.exports = {
  trainPerceptron
}
