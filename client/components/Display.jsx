import React from 'react'
import _ from 'lodash'

import Axes from './Axes'
import Point from './Point'

import {trainNeuron, isAboveLine} from '../neural-nets/perceptronTrainer'

const svgSize = 800
const scale = svgSize / 200
// const cx = svgSize / 2
const cy = svgSize / 2

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
      neuron: null,
      dataPoints: [],
      clickX: 0,
      clickY: 0,
      isOverLine: false,
      hasClicked: false
    }
  }

  componentDidMount () {
    const a = _.random(-2, 2, true)
    const b = _.random(-50, 50)

    console.log('Training perceptron...')
    trainNeuron(1, a, b, this.addDataPoints, true)
      .then(perceptronData => {
        console.log('Perceptron trained!')
        this.setState({
          a,
          b,
          neuron: perceptronData.neuron
        })
      })
  }

  /**
   * Sets the data points to display in the graph
   * @param {[[x, y]]} points an array of points. Points should look like [x, y]
   */
  addDataPoints (points) {
    console.log('setting state to datapoints')
    this.setState({
      dataPoints: [...points]
    })
  }

  setPerceptron (neuron) {
    this.setState({
      neuron
    })
  }

  handleClick (e) {

    // Convert the x and y of the click into the x and y of the scale
    const x = ((e.nativeEvent.offsetX) / scale) - 100
    const y = (((e.nativeEvent.offsetY) / scale) - 100) * -1

    this.setState({
      hasClicked: true,
      clickX: x,
      clickY: y,
      isOverLine: this.state.neuron.process(x, y) ===
        isAboveLine(x, y, this.state.a, this.state.b)
    })
  }

  render () {
    // Find gradient line intercepts
    const yIntLeft = cy - yIntercept(this.state.a, -100, this.state.b) * scale
    const yIntRight = cy - yIntercept(this.state.a, 100, this.state.b) * scale

    let key = 0
    console.log('=== RENDERING ===')

    return (
      <div className='display-wrapper'>
        <div className='display'>
          <svg onClick={this.handleClick} width={svgSize} height={svgSize}>
            {this.state.dataPoints.length > 0 && this.state.dataPoints.map(point => {
              const x = point.x
              const y = point.y
              return <Point
                key={`${x}${y}${key++}`}
                svgSize={svgSize}
                x={(x * scale + svgSize / 2)}
                y={((y * -1) * scale + svgSize / 2)}
                correct={point.expected - point.actual === 0}
                isAboveLine={point.actual}
              />
            })}
            <Axes svgSize={svgSize} />
            <line
              className='gradientLine'
              x1="0" y1={yIntLeft}
              x2={svgSize} y2={yIntRight}
            />)
          </svg>
          <hr/>
          <span className='row push-contents-to-sides'>
            <span>Equation: y = {Number(this.state.a).toFixed(3)}x + {this.state.b || '0'}</span>
            {this.state.hasClicked && (
              <span>The neuron thinks
                ({this.state.clickX}, {this.state.clickY})
              {this.state.isOverLine ? ' is over the line' : ' is under the line'}</span>
            )}
          </span>
        </div>
      </div>
    )
  }
}

const yIntercept = (a, x, b) => Math.round((a * x + b))

export default Display
