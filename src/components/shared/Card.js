import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from './Button'

const Card = ({ children }) => {
  return (
    <Button style={styles.button}>
      <View style={styles.container}>{children}</View>
    </Button>
  )
}

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>
}

const Summary = ({ children }) => {
  return <Text style={styles.summary}>{children}</Text>
}

Card.Title = Title
Card.Summary = Summary

export default Card

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'white',
    borderRadius: 6,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    borderLeftWidth: 3,
    borderLeftColor: 'red', //TODO
    paddingLeft: 12
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  summary: {
    fontSize: 14,
    color: 'blue', //TODO
    marginTop: 8
  }
})
