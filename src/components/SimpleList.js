import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import { Card } from './shared'
import { Right, CircleCheck } from './icons'
import { Circle } from 'react-native-svg'
import FavoritesModal from './FavoritesModal'

const SimpleList = ({
  data,
  hasHeader = true,
  chevron = false,
  onPress = () => {},
  selectable = false,
  selectedList = [],
  onSelect = () => {},
  onLongPress = () => {},
  ...props
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View>
          <Card
            onLongPress={onLongPress}
            onPress={() => {
              selectable ? onSelect(item) : onPress(item.title)
            }}
            style={
              selectedList.includes(item)
                ? { borderColor: 'red', borderWidth: 1 }
                : {}
            }
          >
            <Card.Title>{item.title}</Card.Title>
            {selectable && <FavoritesModal bool={true} />}
            {selectable ? (
              selectedList.includes(item) ? (
                <CircleCheck color="black" />
              ) : (
                <Circle color="blue" />
              )
            ) : (
              chevron && <Right color="red" />
            )}
          </Card>
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
      {...props}
    />
  )
}

export default SimpleList

const styles = StyleSheet.create({})
