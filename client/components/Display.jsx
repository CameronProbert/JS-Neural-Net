import React from 'react'
import _ from 'lodash'

import Axes from './Axes'
import Point from './Point'

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

    // Binds
    this.handleClick = this.handleClick.bind(this)
    this.addDataPoints = this.addDataPoints.bind(this)

    // a and b refer to the line of the graph, ax + b
    this.state = {
      a: null,
      b: null,
      perceptron: null,
      dataPoints: []
    }
  }

  componentDidMount () {
    const a = _.random(-2, 2, true)
    const b = _.random(-50, 50)

    console.log('Training perceptron...')
    trainPerceptron.trainNeuron(1, a, b, this.addDataPoints, true)
      .then(perceptronData => {
        console.log('Perceptron trained!')
        this.setState({
          a,
          b,
          perceptron: perceptronData.perceptron
        })
      })
  }

  /**
   * Sets the data points to display in the graph
   * @param {[[x, y]]} points an array of points. Points should look like [x, y]
   */
  addDataPoints (points) {
    this.setState({
      dataPoints: [...points]
    })
  }

  setPerceptron (perceptron) {
    this.setState({
      perceptron
    })
  }

  handleClick (e) {
    console.log(`Clicked at ${e.clientX}, ${e.clientY}`)
  }

  render () {
    const yIntLeft = cy - yIntercept(this.state.a, -100, this.state.b) * scale
    const yIntRight = cy - yIntercept(this.state.a, 100, this.state.b) * scale
    let key = 0

    return (
      <div className='display-wrapper'>
        <div className='display'>
          <svg onClick={this.handleClick} width={svgSize} height={svgSize}>
            <Axes svgSize={svgSize} />
            {this.state.perceptron && (<line
              className='gradientLine'
              x1="0" y1={yIntLeft}
              x2={svgSize} y2={yIntRight}
            />)}
            {this.state.dataPoints.map(point => {
              const x = point[0]
              const y = point[1]
              return <Point key={`${x}${y}${key++}`} svgSize={svgSize} x={(x + svgSize / 2) * scale} y={(y + svgSize / 2) * scale * -1} />
            })}
          </svg>
        </div>
      </div>
    )
  }
}

const yIntercept = (a, x, b) => Math.round((a * x + b))

export default Display
