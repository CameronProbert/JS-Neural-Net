const _ = require('lodash')

const Perceptron = require('./perceptron')

const maxIterations = 1000000
// const printInterval = 5000
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

/**
 * Trains a perceptron
 * @param {*} perceptron 
 * @param {*} percentCompleteFn Returns the percentage complete as a parameter to this function
 */
function train (perceptron, percentCompleteFn) {
  /* let numCorrect = 0
  let lastCorrect = 0 */
  for (let i = 0; i < maxIterations; i++) {
    const point = [
      _.random(-100, 100),
      _.random(-100, 100)
    ]

    const actual = perceptron.process(point)
    const expected = isAboveLine(point[0], point[1])
    /* if (actual === expected) numCorrect++
    if ((i + 1) % printInterval === 0) {
      console.log(`Correct: ${numCorrect}/${i + 1}\t\t Difference: ${numCorrect - lastCorrect}`)
      console.log(perceptron.weightsToString())
      lastCorrect = numCorrect
    } */
    const difference = expected - actual
    const learningRate = 1 - (i / maxIterations)
    perceptron.adjust(point, difference, learningRate)
    
    if (percentCompleteFn) {
      percentCompleteFn(i / maxIterations)
    }
  }
}

function trainPerceptron (chosenA, chosenB, percentCompleteFn) {
  a = chosenA || _.random(-2, 2, true)
  b = chosenB || _.random(-50, 50)
  // console.log(`Gradient is: ${a.toFixed(2)}x + ${b}`)
  const perceptron = new Perceptron(2)
  train(perceptron, percentCompleteFn)
  return {
    perceptron,
    a,
    b
  }
}

module.exports = {
  trainPerceptron
}
