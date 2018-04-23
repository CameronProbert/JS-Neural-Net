import React from 'react'

const Point = props => {
  const radius = props.svgSize / 400

  return (
    <circle cx={props.x} cy={props.y} r={radius} />
  )
}

export default Point
