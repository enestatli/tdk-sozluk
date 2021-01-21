import * as React from 'react'
import Svg, { Circle } from 'react-native-svg'
/* SVGR has dropped some elements not supported by react-native-svg: title */

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="prefix__ionicon"
      viewBox="0 0 512 512"
      width={props.size}
      height={props.size}
      {...props}
    >
      <Circle
        cx={256}
        cy={256}
        r={32}
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <Circle
        cx={416}
        cy={256}
        r={32}
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
      <Circle
        cx={96}
        cy={256}
        r={32}
        fill="none"
        stroke="currentColor"
        strokeMiterlimit={10}
        strokeWidth={32}
      />
    </Svg>
  )
}

export default SvgComponent
