import React from 'react'
import { StyleSheet, Text } from 'react-native'

import { Button } from './shared'

const SimpleCard = ({ children, ...props }) => {
  return (
    <Button
      extraStyles={{ ...styles.button, ...props.extraCardStyles }}
      {...props}
    >
      {children}
    </Button>
  )
}

const Title = ({ children, ...props }) => {
  return <Text {...props}>{children}</Text>
}

SimpleCard.Title = Title

export default SimpleCard

const styles = StyleSheet.create({
  button: {
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 16
  }
})
