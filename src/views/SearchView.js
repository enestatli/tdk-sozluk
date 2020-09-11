/* eslint-disable react-native/no-inline-styles */
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext
} from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  Text,
  StatusBar,
  Platform,
  FlatList
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import theme from '../utils/theme'
import SearchBox from '../components/SearchBox'
import bg from '../assets/bg.jpg'
import FeedCard from '../components/FeedCard'

import { Logo } from '../components/icons'
import { homeContext, searchContext, historyContext } from '../context'
import SearchSuggestionList from '../components/SearchSuggestionList'
import SimpleList from '../components/SimpleList'

const heroHeight = Dimensions.get('window').height / 3

const SearchView = ({ navigation }) => {
  const homeData = useContext(homeContext)
  const searchData = useContext(searchContext)
  const historyData = useContext(historyContext)
  const [isSearchFocus, setIsSearchFocus] = useState(false)
  const heroHeightAnim = useRef(new Animated.Value(heroHeight)).current

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

  //TODO fix animation!!!

  useEffect(() => {
    if (isSearchFocus) {
      Animated.timing(heroHeightAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start
    } else {
      Animated.timing(heroHeightAnim, {
        toValue: heroHeight,
        duration: 250,
        useNativeDriver: false
      }).start()
    }
  }, [isSearchFocus, heroHeightAnim])

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animateBox, { height: heroHeightAnim }]}>
        {!isSearchFocus && (
          <ImageBackground source={bg} style={styles.image}>
            <View style={styles.logoContainer}>
              <Logo style={styles.logo} />
            </View>
          </ImageBackground>
        )}
        <View
          style={[
            styles.searchBox,
            isSearchFocus && { top: StatusBar.currentHeight / 10 }
          ]}
        >
          <SearchBox onChangeFocus={(status) => setIsSearchFocus(status)} />
        </View>
      </Animated.View>

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
  animateBox: {
    height: heroHeight,
    zIndex: 1,
    position: 'relative'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 120,
    color: 'white'
  },
  searchBox: {
    padding: 16,
    position: 'absolute',
    left: 0,
    width: '100%',
    top: Dimensions.get('window').height / 3.6
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
