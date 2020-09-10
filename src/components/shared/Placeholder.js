import React from 'react'
import { StyleSheet } from 'react-native'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient)

const Placeholder = ({ children, ...props }) => {
  console.log({ ...props.extraPlaceholderStlyes })
  return (
    <ShimmerPlaceHolder
      style={{ ...styles.default, ...props.extraPlaceholderStlyes }}
      {...props}
    >
      {children}
    </ShimmerPlaceHolder>
  )
}

export default Placeholder

const styles = StyleSheet.create({
  default: { height: 16, width: 120 }
})
