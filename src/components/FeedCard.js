import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Placeholder } from './shared'

const FeedCard = ({ data }) => {
  return (
    <View>
      <Text> Bir Kelime</Text>
      <Card style={styles.container}>
        <Card.Title>Title</Card.Title>
        <Card.Summary>long summary</Card.Summary>
      </Card>
    </View>
  )
}

export default FeedCard

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  summaryPlaceholder: {
    marginTop: 16,
    width: 240
  }
})
