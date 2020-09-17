import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { Button } from './shared'
import theme from '../utils/theme'

const ActionButton = ({ children, ...props }) => {
  return (
    <Button extraStyles={{ ...styles.action, ...props.extra }} {...props}>
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
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2
  },
  title: {
    marginRight: 8,
    marginLeft: 8,
    fontWeight: 'bold',
    color: theme.colors.textLight
  }
})
