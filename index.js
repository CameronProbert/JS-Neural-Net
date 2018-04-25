const fs = require('fs')
const path = require('path')

const net = require('./net')
const perceptronTrainer = require('./perceptronTrainer')

const input = process.argv[2]
const numOfRepetitions = process.argv[3] || 1

switch (input) {
  case '--sigmoid':
    perceptronTrainer.trainNeuron(numOfRepetitions, true)
    break
  case '--perceptron':
    perceptronTrainer.trainNeuron(numOfRepetitions, false)
    break
  case '--compare-neurons':

    break
  case '--help':
  default:
    printHelp()
    break
}

function printHelp () {
  const helpMessage = `Welcome to this neural net program.
    add '--sigmoid' to train a single sigmoid neuron
    add '--perceptron' to train a single perceptron neuron
    add '--compare-neurons' to run both neurons
    add another argument to choose the number of neurons to train, to get an average over each of them. If no input is given it will train 100 neurons`
  console.log(helpMessage)
}
