import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Placeholder } from './shared'

const FeedCard = ({ data, onPress }) => {
  return (
    <View>
      <Text> Bir Kelime</Text>
      <View style={styles.container}>
        <Card onPress={onPress}>
          <Card.Title>Title</Card.Title>
          <Card.Summary>long summary</Card.Summary>
        </Card>
      </View>
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
