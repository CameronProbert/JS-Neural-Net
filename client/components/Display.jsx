import React from 'react'

const trainPerceptron = require('../neural-nets/perceptronTrainer')

class Display extends React.Component {
  constructor (props) {
    super(props)

    const perceptronData = trainPerceptron.trainPerceptron()
    const perceptron = perceptronData.perceptron
    const a = perceptronData.a
    const b = perceptronData.b

    this.state = {
      a,
      b,
      perceptron
    }
  }

  setPerceptron (perceptron) {
    this.setState({
      perceptron
    })
  }

  handleClick () {

  }

  render () {
    return (
      <div className='display-wrapper'>
        <div className='display'>
          <canvas onClick={this.handleClick} id='perceptronCanvas' width='400' height='400'></canvas>
        </div>
      </div>
    )
  }
}

export default Display
