import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { Button } from './shared'

const ActionButton = ({ children, ...props }) => {
  return (
    <Button style={styles.action} {...props}>
      {children}
    </Button>
  )
}

const Title = ({ children, ...props }) => {
  return (
    <Text style={styles.title} {...props}>
      {children}
    </Text>
  )
}

ActionButton.Title = Title

export default ActionButton

const styles = StyleSheet.create({
  action: {
    backgroundColor: 'white',
    borderRadius: 9999,
    minWidth: 48,
    height: 48,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginRight: 8,
    marginLeft: 8,
    fontWeight: 'bold',
    color: 'red' //TODO
  }
})
