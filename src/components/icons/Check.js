import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgCheck({ title, titleId, ...props }) {
  return (
    <Svg
      width={18}
      height={18}
      viewBox="0 0 28 28"
      fill="none"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <Path
        d="M14 .667C6.648.667.667 6.648.667 14S6.648 27.333 14 27.333 27.333 21.352 27.333 14 21.352.667 14 .667zm-2.665 19.217l-4.951-4.94 1.883-1.888 3.065 3.06 7.059-7.059 1.885 1.886-8.941 8.941z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SvgCheck
