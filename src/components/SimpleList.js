import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import { Card } from './shared'
import { Right } from './icons'

const SimpleList = ({
  data,
  hasHeader = true,
  chevron = false,
  onPress = () => {}
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Card onPress={() => onPress(item.title)}>
            <Card.Title>{item.title}</Card.Title>
          </Card>
          {chevron && <Right color="yellow" />}
        </View>
      )}
      ListFooterComponent={<View style={{ height: 20 }} />}
      ListHeaderComponent={
        hasHeader ? (
          <Text>Son Aramalar</Text>
        ) : (
          <Text>Bu neymis gormek istedim</Text>
        )
      }
    />
  )
}

export default SimpleList

const styles = StyleSheet.create({})
