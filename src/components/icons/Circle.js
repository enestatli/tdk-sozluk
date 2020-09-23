import * as React from 'react'
import Svg, { Circle } from 'react-native-svg'

function SvgCircle(props) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className=""
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
    </Svg>
  )
}

export default SvgCircle
