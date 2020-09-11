/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback, useContext } from 'react'
import { View, StyleSheet, Dimensions, StatusBar, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import theme from '../utils/theme'
import FeedCard from '../components/FeedCard'

import { homeContext, searchContext, historyContext } from '../context'
import SearchSuggestionList from '../components/SearchSuggestionList'
import SimpleList from '../components/SimpleList'
import SearchPageAnimation from '../components/SearchPageAnimation'

const SearchView = ({ navigation }) => {
  const homeData = useContext(homeContext)
  const searchData = useContext(searchContext)
  const historyData = useContext(historyContext)
  const [isSearchFocus, setIsSearchFocus] = useState(false)

  useEffect(() => {
    homeData.setData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(isSearchFocus ? 'dark-content' : 'light-content')
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(
          isSearchFocus ? theme.colors.softRed : theme.colors.red
        )
    }, [isSearchFocus])
  )

  return (
    <View style={styles.container}>
      <SearchPageAnimation
        isSearchFocus={isSearchFocus}
        onSearchFocus={setIsSearchFocus}
      />

      <View
        style={{
          flex: 1,
          paddingTop: 26,
          backgroundColor: theme.colors.softRed
        }}
      >
        {isSearchFocus ? (
          <View style={{ flex: 1, borderColor: 'red', borderWidth: 1 }}>
            {searchData.keyword.length >= 3 ? (
              <SearchSuggestionList
                onPress={(k) => navigation.navigate('Details', { keyword: k })}
                keyword={searchData.keyword}
                data={searchData.suggestions}
              />
            ) : (
              <SimpleList
                onPress={(k) => navigation.navigate('Details', { keyword: k })}
                data={historyData.history}
              />
            )}
          </View>
        ) : (
          <View style={styles.feedContainer}>
            <FeedCard
              title={'Bir Kelime'}
              data={homeData.data?.kelime}
              onPress={() =>
                navigation.navigate('Details', {
                  keyword: homeData.data?.kelime.madde
                })
              }
            />
            <View style={{ marginTop: 40 }}>
              <FeedCard
                title={'Bir Deyim - Atasözü'}
                data={homeData.data?.atasoz}
                onPress={() =>
                  navigation.navigate('Details', {
                    keyword: homeData.data?.atasoz.madde
                  })
                }
              />
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.softRed
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedContainer: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 16
  },
  historyList: {
    flex: 1,
    marginTop: 0
  },
  item: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16
  }
})

export default SearchView
