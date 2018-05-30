import React from 'react'

const Point = props => {
  const radius = props.svgSize / 400
  let colour = 'red'
  if (props.correct && props.isAboveLine) {
    colour = 'green'
  }
  if (props.correct && !props.isAboveLine) {
    colour = 'blue'
  }

  return (
    <circle cx={props.x} cy={props.y} r={radius} fill={colour}/>
  )
}

export default Point
