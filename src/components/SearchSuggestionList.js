import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Book, Right } from './icons'
import theme from '../utils/theme'
import { Card } from './shared'

const emphasize = (keyword, text) => {
  let key = 0
  const arr = text.split(keyword.toLocaleLowerCase('tr'))
  let arr2 = []
  for (let i = 0; i < arr.length; i++) {
    arr2.push(<Text key={'t' + ++key}>{arr[i]}</Text>)
    if (arr[i + 1] !== undefined) {
      arr2.push(
        <Text key={'t' + ++key}>{keyword.toLocaleLowerCase('tr')}</Text>
      )
    }
  }
  return arr2
}

const SearchSuggestionList = ({ keyword, data, onPress }) => {
  if (data.length === 0) {
    return (
      <View>
        <Book color={theme.colors.textLight} />
        <Text>Aradiginiz sozcuk bulunamadi</Text>
      </View>
    )
  } else {
    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id + ''}
        renderItem={({ item }) => (
          <View>
            <Card onPress={() => onPress(item.madde)}>
              <Card.Title>{emphasize(keyword, item.madde)}</Card.Title>
            </Card>
            <Right color={theme.colors.red} />
          </View>
        )}
        ItemSeparatorComponent={() => (
          <View style={{ backgroundColor: 'blue' }} />
        )}
      />
    )
  }
}

export default SearchSuggestionList

const styles = StyleSheet.create({})
