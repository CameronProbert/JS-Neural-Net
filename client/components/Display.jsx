import React from 'react'

import Axes from './Axes'

const trainPerceptron = require('../neural-nets/perceptronTrainer')

const svgSize = 600
const scale = svgSize / 200
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

    // a and b refer to the line of the graph, ax + b
    this.state = {
      a: a || testA,
      b: b || testB,
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
    const yIntLeft = cy - yIntercept(this.state.a, -100, this.state.b) * scale
    const yIntRight = cy - yIntercept(this.state.a, 100, this.state.b) * scale

    return (
      <div className='display-wrapper'>
        <div className='display'>
          <svg onClick={this.handleClick} width={svgSize} height={svgSize}>
            <Axes svgSize={svgSize} />
            <line
              className='gradientLine'
              x1="0" y1={yIntLeft}
              x2={svgSize} y2={yIntRight}
            />

          </svg>
        </div>
      </div>
    )
  }
}

const yIntercept = (a, x, b) => Math.round((a * x + b))

export default Display
