import trainNeuron from './perceptronTrainer'
import _ from 'lodash'

function run (args: string[]) {
  const type = args[0];
  const numToTrain = _.parseInt(args[1])
  const a = _.parseInt(args[1])
  const b = _.parseInt(args[1])
  switch (type) {
    case '--perceptron':
      trainNeuron(numToTrain || 1, a, b, null, false)
      break
    case '--sigmoid':
      trainNeuron(numToTrain || 1, a, b, null, true)
      break
    default:
      trainNeuron(numToTrain || 1, a, b, null, true)
  }
}
const args = process.argv.splice(2)
run(args)