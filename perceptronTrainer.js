const Perceptron = require('./perceptron')

const maxIterations = 1000
const learningRate = 0.5
const a = 0.5
const b = -10

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
  for (let i = 0; i < maxIterations; i++) {
    const point = [
      Math.random() * 201 - 101,
      Math.random() * 201 - 101
    ]

    const actual = perceptron.process(point)
    const expected = isAboveLine(point[0], point[1])
    if (actual === expected) numCorrect++
    if (i % 50 === 0) console.log(`Correct: ${numCorrect}/${i}`)
    const difference = expected - actual

    perceptron.adjust(point, difference, learningRate)
  }
}

function trainPerceptron () {
  const perceptron = new Perceptron(1)
  train(perceptron)
}

module.exports = {
  trainPerceptron
}
