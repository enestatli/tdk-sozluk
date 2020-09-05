import React from 'react'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { Card, Placeholder } from './shared'

const FeedCard = ({ data, navigation, onPress }) => {
  // console.log(data, 'data')
  return (
    <View>
      <Text> Bir Kelime</Text>
      {/* Card */}
      <Card onPress={onPress}>
        <>
          <Placeholder autoRun visible={data !== null ? true : false}>
            <Card.Title>{data?.madde}</Card.Title>
          </Placeholder>
          <Placeholder autoRun visible={data !== null ? true : false}>
            <Card.Summary>{data?.anlam}</Card.Summary>
          </Placeholder>
        </>
      </Card>

      {/* <View style={styles.container}>
        <Card
          onPress={() =>
            navigation.navigate('Details', { title: data?.kelime.madde })
          }
        >
          <>
            <Card.Title>{data?.kelime.madde}</Card.Title>
            <Card.Summary>{data?.kelime.anlam}</Card.Summary>
          </>
        </Card>
        <Card
          onPress={() =>
            navigation.navigate('Details', { title: data?.atasoz.madde })
          }
        >
          <>
            <Card.Title>{data?.atasoz.madde}</Card.Title>
            <Card.Summary>{data?.atasoz.anlam}</Card.Summary>
          </>
        </Card>
      </View> */}
    </View>
  )
}

export default FeedCard

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  titlePlaceholder: {
    height: 16,
    width: 120
  },
  summaryPlaceholder: {
    marginTop: 16,
    width: 240
  }
})
