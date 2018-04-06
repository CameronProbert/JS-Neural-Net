const fs = require('fs')
const path = require('path')

const net = require('./net')
const perceptronTrainer = require('./perceptronTrainer')

const input = process.argv[2]

/* function testPerceptron (filepath) {
  // console.log('in testPerception')
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) console.error(err)
    perceptronTrainer.trainPerceptron(JSON.parse(data))
  })
} */

// console.log(input)

/* if (process.argv[2]) net.run(input)
else testPerceptron(path.join(__dirname, 'data.json')) */

perceptronTrainer.trainPerceptron()
