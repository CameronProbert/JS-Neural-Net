import React, { MouseEvent, useEffect, useState } from 'react'
import _ from 'lodash'

import Axes from './Axes'
import Point from './Point'

import trainNeuron from '../neural-nets/perceptronTrainer'
import { TestPoint } from '../neural-nets/types'

const svgSize = 800
const scale = svgSize / 200
// const cx = svgSize / 2
const cy = svgSize / 2

function yIntercept (a: number, x: number, b: number): number { return  Math.round((a * x + b))}

const Display: React.FC = () => {
  const [a] = useState<number>(_.random(-2, 2, true))
  const [b] = useState<number>(_.random(-50, 50))
  // const [perceptron, setPerceptron] = useState<any | null>(null)
  const [dataPoints, setDataPoints] = useState<TestPoint[]>([])

  useEffect(() => {
    console.log('Training perceptron...');
    trainNeuron(1, a, b, setDataPoints, true)
      // .then((perceptronData: any) => {
      //   console.log('Perceptron trained!')
      //   setA(a);
      //   setB(b);
      //   // setPerceptron(perceptronData.perceptron);
      // })
  }, [])

  function handleClick (e: MouseEvent) {
    console.log(`Clicked at ${e.clientX}, ${e.clientY}`)
  }

  const yIntLeft = cy - yIntercept(a, -100, b) * scale
  const yIntRight = cy - yIntercept(a, 100, b) * scale
  let key = 0

  return (
    <div className='display-wrapper'>
      <div className='display'>
        <svg onClick={handleClick} width={svgSize} height={svgSize}>
          <Axes svgSize={svgSize} />
          <line
            className='gradientLine'
            x1="0" y1={yIntLeft}
            x2={svgSize} y2={yIntRight}
          />)
          {dataPoints.length > 0 && dataPoints.map(point => {
            const x = point.x
            const y = point.y
            return <Point
              key={`${x}${y}${key++}`}
              svgSize={svgSize}
              point={{
                stroke: '123',x: (x * scale + svgSize / 2),y: (y * -1) * scale + svgSize / 2
              }}
              correct={point.expected! - point.actual! === 0}
              isAboveLine={!!point.actual}
            />
          })}
        </svg>
        <hr/>
        <span>Equation: y = {Number(a).toFixed(3)}x + {b}</span>
      </div>
    </div>
  )
}

export default Display
