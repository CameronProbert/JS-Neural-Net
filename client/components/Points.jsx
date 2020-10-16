import React from 'react'

class Points extends React.Component {
  constructor (props) {
    super(props)

    // binds
    this.addPoint = this.addPoint.bind(this)
    this.createPoint = this.createPoint.bind(this)

    this.state = {
      points: [],
      radius: 2
    }
  }

  addPoint (x, y, stroke) {
    const newPoint = {x, y, stroke}
    this.setState({
      points: [...this.state.points, newPoint]
    })
  }

  render () {
    const {points, radius} = this.state;
    return points.map(point => {
      return (
        <circle cx={point.x} cy={point.y} r={radius} stroke={point.stroke} />
      )
    })
  }
}

export default Points
