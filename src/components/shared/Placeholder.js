import React from 'react'
import { StyleSheet } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

const Placeholder = ({ children, ...props }) => {
  return (
    <ShimmerPlaceHolder style={styles.default} {...props}>
      {children}
    </ShimmerPlaceHolder>
  )
}

export default Placeholder

const styles = StyleSheet.create({
  default: {
    height: 16,
    width: 120
  }
})
