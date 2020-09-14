import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from './shared'
import theme from '../utils/theme'

const ActionButton = ({ children, ...props }) => {
  return (
    <Button extraStlyes={{ ...styles.action, ...props.extraStlyes }} {...props}>
      {children}
    </Button>
  )
}

const Title = ({ children, ...props }) => {
  return (
    <Text style={[styles.title, props]} {...props}>
      {children}
    </Text>
  )
}

ActionButton.Title = Title

export default ActionButton

const styles = StyleSheet.create({
  action: {
    backgroundColor: 'white',
    minWidth: 48,
    height: 48,
    paddingHorizontal: 12
  },
  title: {
    marginRight: 8,
    marginLeft: 8,
    fontWeight: 'bold',
    color: theme.colors.textLight
  }
})
