import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Placeholder } from './shared'

const DetailCard = ({ data, border }) => {
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.textContainer}>
          <Text>{data?.anlam_sira + ' '}</Text>
          <Text>{data?.ozellik}</Text>
        </View>

        <View style={styles.summaryContainer}>
          <Text>{data?.anlam}</Text>
          {data?.ornek.map((ornek) => (
            <View key={ornek.id}>
              <Text style={styles.example}>
                {ornek.ornek} {''}
                <Text>{ornek.yazar}</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  )
}

export default DetailCard

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'white',
    paddingHorizontal: 28,
    paddingVertical: 20
  },
  textContainer: {
    flexDirection: 'row'
  },
  summaryContainer: {
    marginTop: 8
  },
  example: {
    marginLeft: 10,
    marginTop: 12
  },
  summaryPlaceholder: {
    marginTop: 16,
    width: 240
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: 'black'
  }
})
