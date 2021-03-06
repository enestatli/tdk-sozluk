import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import theme from '../utils/theme'
import SimpleCard from './SimpleCard'

import { Book, Right } from './icons'

const emphasize = (keyword, text) => {
  let key = 0
  const arr = text.split(keyword.toLocaleLowerCase('tr'))
  let arr2 = []
  for (let i = 0; i < arr.length; i++) {
    arr2.push(<Text key={'t' + ++key}>{arr[i]}</Text>)
    if (arr[i + 1] !== undefined) {
      arr2.push(
        <Text key={'t' + ++key} style={styles.emphasizeText}>
          {keyword.toLocaleLowerCase('tr')}
        </Text>
      )
    }
  }
  return arr2
}

const SearchSuggestionList = ({ keyword, data, onPress }) => {
  if (data.length === 0) {
    return (
      <View style={styles.bookIconContainer}>
        <Book style={styles.bookIcon} />
        <Text style={styles.bookIconText}>Aradığınız sözcük bulunamadı</Text>
      </View>
    )
  } else {
    return (
      <FlatList
        style={styles.flatList}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View>
            <SimpleCard
              extraStyles={styles.cardContainer}
              onPress={() => onPress(item)}
            >
              <SimpleCard.Title style={styles.cardTitle}>
                {emphasize(keyword, item)}
              </SimpleCard.Title>
              <Right size={18} style={styles.rightIcon} />
            </SimpleCard>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={styles.borderBottom} />}
      />
    )
  }
}

export default SearchSuggestionList

const styles = StyleSheet.create({
  bookIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bookIcon: {
    height: 48,
    width: 48,
    color: theme.colors.textLight
  },
  bookIconText: {
    fontWeight: '500',
    marginTop: 24,
    color: theme.colors.textLight
  },
  flatList: {
    backgroundColor: 'white'
  },
  cardContainer: {
    paddingHorizontal: 16,
    paddingVertical: 27
  },
  cardTitle: {
    fontSize: 16,
    paddingRight: 32,
    fontWeight: 'normal'
  },
  rightIcon: {
    marginLeft: 'auto',
    color: theme.colors.red
  },
  footer: {
    height: 1,
    flex: 1,
    marginHorizontal: 16,
    backgroundColor: theme.colors.softGray
  },
  emphasizeText: {
    fontWeight: 'bold'
  },
  borderBottom: {
    position: 'absolute',
    bottom: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: theme.colors.light
  }
})
