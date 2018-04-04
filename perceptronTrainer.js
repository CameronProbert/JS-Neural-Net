const Perceptron = require('./perceptron')

let a = 0
let b = 0

/**
 * Returns the y value of the function ax + b
 * @param {*} x The x co-ordinate value of the graph
 */
function test (x) {
  return a * x + b
}

function isAboveLine (x, y) {
  test(x) < y ? 0 : 1
}

function train (perceptron, maxIterations, learningRate) {
  for (let i = 0; i < maxIterations; i++) {
    
  }
}