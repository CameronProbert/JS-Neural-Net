import React from 'react'

const numTicks = 20
const numPosTicks = numTicks / 2
const numNegTicks = numTicks / -2

/**
 * Generates the axis for the svg
 * @param {*} props React element properties. Requires the svg size in svgSize element.
 */
const Axes = props => {
  const cx = props.svgSize / 2
  const cy = props.svgSize / 2

  const ticks = generateTicks(props.svgSize)
  ticks.push(<line key='x-axis' className='axis x-axis' x1={cx} y1="0" x2={cx} y2={props.svgSize} />)
  ticks.push(<line key='y-axis' className='axis y-axis' x1="0" y1={cy} x2={props.svgSize} y2={cy} />)

  return (ticks)
}

/**
 * Generates numTicks svg lines for the axis
 * @param {*} svgSize The size of the svg element. Used so the function can scale the axes ticks
 * @returns Array of html/svg 'line' elements
 */
function generateTicks (svgSize) {
  const cx = svgSize / 2
  const cy = svgSize / 2
  const tickSpacing = svgSize / numTicks
  const tickLength = svgSize / 100 * 1

  const ticks = []

  for (let i = numNegTicks; i < numPosTicks; i++) {
    if (i === 0) continue
    const xTick = (
      <line
        key={'x-axis' + i}
        className='axis tick'
        x1={cx - (i * tickSpacing)}
        y1={cy}
        x2={cx - (i * tickSpacing)}
        y2={cy + tickLength}
      />
    )
    const yTick = (
      <line
        key={'y-axis' + i}
        className='axis tick'
        x1={cx}
        y1={cy - (i * tickSpacing)}
        x2={cx - tickLength}
        y2={cy - (i * tickSpacing)}
      />
    )
    ticks.push(xTick)
    ticks.push(yTick)
  }
  return ticks
}

export default Axes
