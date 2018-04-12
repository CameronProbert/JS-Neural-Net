import React from 'react'

const trainPerceptron = require('../neural-nets/perceptronTrainer')

const svgSize = 600
const cx = svgSize / 2
const cy = svgSize / 2

const testA = 1
const testB = 50

class Display extends React.Component {
  constructor (props) {
    super(props)

    const perceptronData = trainPerceptron.trainPerceptron()
    const perceptron = perceptronData.perceptron
    const a = perceptronData.a
    const b = perceptronData.b

    // Binds
    this.handleClick = this.handleClick.bind(this)

    this.state = {
      a: testA,
      b: testB,
      perceptron,
      dataPoints: []
    }
  }

  setPerceptron (perceptron) {
    this.setState({
      perceptron
    })
  }

  handleClick (e) {
    console.log('clicked')
  }

  render () {
    return (
      <div className='display-wrapper'>
        <div className='display'>
          <svg onClick={this.handleClick} width={svgSize} height={svgSize}>
            <line className='axis' x1={cx} y1="0" x2={cx} y2={svgSize} />
            <line className='axis' x1="0" y1={cy} x2={svgSize} y2={cy} />
            <line
              className='gradientLine'
              x1="0" y1={cy - bound(testA, -100, testB)}
              x2={svgSize} y2={cy - bound(testA, 100, testB)}
            />
          </svg>
        </div>
      </div>
    )
  }
}

const bound = (a, x, b) => Math.round((a * x + b) * (svgSize / 200))

export default Display
