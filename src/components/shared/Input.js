import React from 'react'
import { TextInput } from 'react-native'
import theme from '../../utils/theme'

const Input = ({ children, placeholderTextColor, ...props }) => {
  return (
    <TextInput
      placeholderTextColor={
        placeholderTextColor !== null
          ? theme.colors[placeholderTextColor]
          : '#999'
      }
      {...props}
    >
      {children}
    </TextInput>
  )
}

export default Input
