const fs = require('fs')

const main = require('./net')

const input = process.argv[2]

function testPerceptron (filepath) {
  fs.readFile(filepath, 'utf-8', (data) => {
    main.testPerceptron(data.dataPoints)
  })
}

console.log(input)

if (process.argv) main.run(input)
else testPerceptron('./data.json')
