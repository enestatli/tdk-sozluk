/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import theme from '../utils/theme'
import FeedCard from '../components/FeedCard'
import SearchSuggestionList from '../components/SearchSuggestionList'
import SimpleList from '../components/SimpleList'
import SearchPageAnimation from '../components/SearchPageAnimation'

import { homeContext, searchContext, historyContext } from '../context'

const SearchView = ({ navigation }) => {
  const homeData = useContext(homeContext)
  const searchData = useContext(searchContext)
  const historyData = useContext(historyContext)
  const [isSearchFocus, setIsSearchFocus] = useState(false)

  useEffect(() => {
    homeData.setData()
    return () => {
      searchData.setKeyword('')
    }
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
    <SafeAreaView style={styles.container}>
      <SearchPageAnimation
        isSearchFocus={isSearchFocus}
        onSearchFocus={setIsSearchFocus}
      />

      <View
        style={[
          styles.content,
          {
            paddingTop: isSearchFocus ? 0 : 10
          }
        ]}
      >
        {isSearchFocus ? (
          <View style={{ flex: 1 }}>
            {searchData.keyword.length >= 3 ? (
              <SearchSuggestionList
                onPress={(k) =>
                  navigation.navigate('Details', {
                    keyword: k
                  })
                }
                keyword={searchData.keyword}
                data={searchData.suggestions}
              />
            ) : (
              <SimpleList
                onPress={(k) =>
                  navigation.navigate('Details', {
                    keyword: k
                  })
                }
                data={historyData.history}
              />
            )}
          </View>
        ) : (
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.feedContainer}>
              <FeedCard
                title={'Bir Kelime'}
                data={homeData.data?.kelime}
                onPress={() =>
                  navigation.navigate('Details', {
                    keyword: homeData.data?.kelime.madde,
                    tabs: 'anlamlar'
                  })
                }
              />
              <View style={{ marginTop: 15 }}>
                <FeedCard
                  title={'Bir Deyim - Atasözü'}
                  data={homeData.data?.atasoz}
                  onPress={() =>
                    navigation.navigate('Details', {
                      keyword: homeData.data?.atasoz.madde,
                      tabs: 'atasozu'
                    })
                  }
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.softRed
  },
  content: {
    flex: 1,
    backgroundColor: theme.colors.softRed
  },
  feedContainer: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 16
  }
})

export default SearchView
