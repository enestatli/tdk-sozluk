import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

const Button = ({ children, ...props }) => {
  return (
    <TouchableOpacity style={styles.default} {...props}>
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
