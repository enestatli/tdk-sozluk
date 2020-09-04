import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Card, Placeholder } from './shared'

const FeedCard = ({ data, navigation }) => {
  console.log(data)
  return (
    <View>
      <Text> Bir Kelime</Text>
      <View style={styles.container}>
        <Card
          onPress={() =>
            navigation.navigate('Details', { title: data?.kelime.madde })
          }
        >
          {data ? (
            <>
              <Card.Title>{data?.kelime.madde}</Card.Title>
              <Card.Summary>{data?.kelime.anlam}</Card.Summary>
            </>
          ) : (
            <ActivityIndicator />
          )}
        </Card>
        <Card
          onPress={() =>
            navigation.navigate('Details', { title: data?.atasoz.madde })
          }
        >
          {data ? (
            <>
              <Card.Title>{data?.atasoz.madde}</Card.Title>
              <Card.Summary>{data?.atasoz.anlam}</Card.Summary>
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
