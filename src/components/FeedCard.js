import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Card, Placeholder } from './shared'

const FeedCard = ({ data, onPress, border, navigation }) => {
  return (
    <View>
      <Text> Bir Kelime</Text>
      <View style={styles.container}>
        <Card
          onPress={() =>
            navigation.navigate('Details', { title: data?.kelime[0].madde })
          }
        >
          {data ? (
            <>
              <Card.Title>{data?.kelime[0].madde}</Card.Title>
              <Card.Summary>{data?.kelime[0].anlam}</Card.Summary>
            </>
          ) : (
            <ActivityIndicator />
          )}
        </Card>
        <Card
          onPress={() =>
            navigation.navigate('Details', { title: data?.atasoz[0].madde })
          }
        >
          {data ? (
            <>
              <Card.Title>{data?.atasoz[0].madde}</Card.Title>
              <Card.Summary>{data?.atasoz[0].anlam}</Card.Summary>
            </>
          ) : (
            <ActivityIndicator />
          )}
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
