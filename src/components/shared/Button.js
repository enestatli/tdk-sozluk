import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

const Button = ({ children, ...props }) => {
  // const com = StyleSheet.compose(styles, props.extraStyles)
  return (
    <TouchableOpacity style={[styles.default, props.extraStyles]} {...props}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999
  }
})

export default Button
