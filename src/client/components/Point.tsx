import React from 'react'
import {Point as _Point} from './types'

type Props = {
  svgSize: number,
  correct: boolean,
  isAboveLine: boolean,
  point: _Point
}

const Point: React.FC<Props> = ({svgSize, correct, isAboveLine, point}) => {
  const radius = svgSize / 400
  let colour = 'red'
  if (correct && isAboveLine) {
    colour = 'green'
  }
  if (correct && !isAboveLine) {
    colour = 'blue'
  }

  return (
    <circle cx={point.x} cy={point.y} r={radius} fill={colour}/>
  )
}

export default Point
