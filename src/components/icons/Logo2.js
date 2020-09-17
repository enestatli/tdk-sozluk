import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgLogo2({ title, titleId, ...props }) {
  return (
    <Svg
      width={97}
      height={15}
      viewBox="0 0 97 15"
      fill="none"
      aria-labelledby={titleId}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}
      <Path
        d="M5.8 11V2.9h2.96V1.135H.775v1.763h2.96V11H5.8zm10.484-7.54h-1.99v4.348c0 1.005-.532 1.627-1.524 1.627-.915 0-1.387-.534-1.387-1.573V3.46h-1.99v4.915c0 1.75 1.012 2.79 2.64 2.79 1.14 0 1.845-.5 2.2-1.375h.123V11h1.928V3.46zm-5.093-1.183a1.06 1.06 0 001.067-1.066 1.064 1.064 0 10-2.126 0c0 .602.478 1.066 1.06 1.066zm3.295 0c.588 0 1.06-.465 1.06-1.066a1.06 1.06 0 00-1.06-1.073c-.588 0-1.066.471-1.066 1.073a1.06 1.06 0 001.066 1.066zM18.08 11h1.99V6.823c0-1.06.745-1.702 1.832-1.702.32 0 .786.062.943.123V3.433c-.171-.062-.506-.096-.78-.096-.956 0-1.736.574-1.934 1.326h-.123V3.46H18.08V11zm8.079-4.594h-.123V.582h-1.99V11h1.99V8.498l.546-.56L28.784 11h2.358l-3.07-4.307 2.872-3.233H28.68L26.16 6.406zM38.42 6.12c-.164-1.716-1.36-2.823-3.356-2.823-2.358 0-3.684 1.415-3.684 3.917 0 2.331 1.127 3.719 3.144 3.924l-.43.69v.807h.45c.595 0 .896.089.896.362 0 .3-.41.39-.813.39-.322 0-.643-.055-.746-.09v.944c.274.069.643.116.998.116 1.115 0 1.928-.45 1.928-1.408 0-.738-.574-1.169-1.401-1.223l.39-.616c1.53-.239 2.481-1.25 2.624-2.72h-1.859c-.15.745-.684 1.141-1.497 1.141-1.066 0-1.675-.813-1.675-2.317 0-1.484.602-2.283 1.675-2.283.848 0 1.36.471 1.497 1.19h1.86zm4.62-1.299c.93 0 1.531.622 1.572 1.62H41.4c.069-.977.718-1.62 1.64-1.62zm1.613 4.034c-.212.499-.752.779-1.538.779-1.039 0-1.695-.697-1.723-1.819v-.102h5.175v-.608c0-2.393-1.312-3.808-3.534-3.808-2.242 0-3.623 1.517-3.623 3.972 0 2.447 1.354 3.896 3.65 3.896 1.846 0 3.152-.895 3.446-2.31h-1.853zm6.511-.595c.075 1.839 1.6 2.994 3.951 2.994 2.475 0 4-1.217 4-3.206 0-1.531-.855-2.386-2.837-2.803l-1.19-.253c-1.155-.246-1.627-.595-1.627-1.203 0-.752.684-1.23 1.716-1.23.998 0 1.723.52 1.818 1.298h1.942C58.875 2.1 57.337.883 55.163.883c-2.276 0-3.773 1.223-3.773 3.083 0 1.504.882 2.44 2.68 2.816l1.285.274c1.21.26 1.702.622 1.702 1.25 0 .746-.759 1.265-1.832 1.265-1.162 0-1.969-.512-2.065-1.312h-1.996zm12.85 2.905c2.317 0 3.712-1.47 3.712-3.937 0-2.448-1.415-3.931-3.712-3.931s-3.712 1.49-3.712 3.93c0 2.468 1.395 3.938 3.712 3.938zm0-1.627c-1.066 0-1.668-.84-1.668-2.31 0-1.45.609-2.304 1.668-2.304 1.053 0 1.668.854 1.668 2.304 0 1.462-.608 2.31-1.668 2.31zm-1.647-7.26a1.06 1.06 0 001.066-1.066 1.063 1.063 0 10-2.126 0c0 .602.479 1.066 1.06 1.066zm3.295 0c.587 0 1.06-.465 1.06-1.066a1.06 1.06 0 00-1.06-1.073c-.588 0-1.067.471-1.067 1.073a1.06 1.06 0 001.067 1.066zM68.981 11h6.282V9.414H71.58v-.123l3.595-4.519V3.46h-6.138v1.586h3.76v.123l-3.815 4.655V11zm7.969 0h1.99V.582h-1.99V11zm10.683-7.54h-1.99v4.348c0 1.005-.533 1.627-1.524 1.627-.916 0-1.388-.534-1.388-1.573V3.46h-1.989v4.915c0 1.75 1.012 2.79 2.639 2.79 1.141 0 1.846-.5 2.201-1.375h.123V11h1.928V3.46zM82.54 2.277a1.06 1.06 0 001.066-1.066 1.064 1.064 0 10-2.126 0c0 .602.479 1.066 1.06 1.066zm3.295 0c.588 0 1.06-.465 1.06-1.066a1.06 1.06 0 00-1.06-1.073c-.588 0-1.067.471-1.067 1.073a1.06 1.06 0 001.067 1.066zm5.775 4.13h-.124V.581h-1.989V11h1.99V8.498l.546-.56L94.235 11h2.359l-3.07-4.307 2.872-3.233h-2.263l-2.522 2.946z"
        fill="currentColor"
      />
    </Svg>
  )
}

export default SvgLogo2
