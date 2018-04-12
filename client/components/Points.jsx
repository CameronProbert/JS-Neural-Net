import React from 'react'

class Points extends React.Component {
  constructor (props) {
    super(props)

    // binds
    this.addPoint = this.addPoint.bind(this)
    this.createPoint = this.createPoint.bind(this)

    const testPoint = {
      x: 50,
      y: 50,
      stroke: 'green'
    }
    this.state = {
      points: [testPoint]
      radius:
    }
  }

  addPoint (x, y, stroke) {
    const newPoint = {x, y, stroke}
    this.setState({
      points: [...this.state.points, newPoint]
    })
  }

  render () {
    return this.state.points.map(point => {
      return (
        <circle cx= cy= r= stroke={point.stroke} />
      )
    })
  }
}

export default Points
