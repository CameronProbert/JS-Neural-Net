const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname, 'tests/data.json'), 'utf-8', (err, data) => {
  if (err) console.error(err)
  const output = JSON.parse(data).dataPoints
  console.log(print(output, 'x'))
  console.log(print(output, 'y'))
})

function print (data, attr) {
  let str = ''
  data.forEach(item => {
    str += item[attr].toFixed(3) + ','
  })
  return str
}
