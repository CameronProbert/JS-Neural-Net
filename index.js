const fs = require('fs')
const path = require('path')

const main = require('./net')

const input = process.argv[2]

function testPerceptron (filepath) {
  // console.log('in testPerception')
  fs.readFile(filepath, 'utf-8', (err, data) => {
    if (err) console.error(err)
    main.testPerceptron(JSON.parse(data).dataPoints)
  })
}

// console.log(input)

if (process.argv[2]) main.run(input)
else testPerceptron(path.join(__dirname, 'data.json'))
