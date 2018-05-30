const neuronTrainer = require('./perceptronTrainer')

function run (args) {
  switch (args[0]) {
    case '--perceptron':
      neuronTrainer.trainNeuron(args[1] || 1, args[2], args[3], null, false)
      break
    case '--sigmoid':
      neuronTrainer.trainNeuron(args[1] || 1, args[2], args[3], null, true)
      break
    default:
      neuronTrainer.trainNeuron(args[1] || 1, args[2], args[3], null, true)
  }
}
const args = process.argv.splice(2)
run(args)