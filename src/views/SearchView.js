/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useCallback, useContext } from 'react'
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  ImageBackground,
  Dimensions,
  Touchable,
  TouchableOpacity,
  Animated
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import theme from '../utils/theme'
import FeedCard from '../components/FeedCard'
import SearchSuggestionList from '../components/SearchSuggestionList'
import SimpleList from '../components/SimpleList'
import SearchPageAnimation from '../components/SearchPageAnimation'

import { homeContext, searchContext, historyContext } from '../context'

import bg from '../assets/bg.jpg'
import { Button, Input } from '../components/shared'
import { Close, Search } from '../components/icons'
import SpecialCharacters from '../components/SpecialCharacters'

const SearchView = ({ route, navigation }) => {
  const homeData = useContext(homeContext)
  const searchData = useContext(searchContext)
  const historyData = useContext(historyContext)
  const [isSearchFocus, setIsSearchFocus] = useState(false)
  const searchAnim = React.useRef(new Animated.Value(1)).current
  const specialAnim = React.useRef(new Animated.Value(0)).current

  // useEffect(() => {
  //   homeData.setData()
  //   return () => {
  //     searchData.setKeyword('')
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle(isSearchFocus ? 'dark-content' : 'light-content')
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(
          isSearchFocus ? theme.colors.softRed : theme.colors.red
        )
    }, [isSearchFocus])
  )

  useEffect(() => {
    if (isSearchFocus) {
      Animated.timing(searchAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(searchAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false
      }).start()
    }
  }, [searchAnim, isSearchFocus])

  useEffect(() => {
    if (isSearchFocus) {
      Animated.timing(specialAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(specialAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start()
    }
  }, [specialAnim, isSearchFocus])

  useEffect(() => {
    console.log(isSearchFocus)
  }, [isSearchFocus])

  //  <SafeAreaView style={styles.container}>
  //     <SearchPageAnimation
  //       isSearchFocus={isSearchFocus}
  //       onSearchFocus={setIsSearchFocus}
  //     />

  //     <View
  //       style={[
  //         styles.content,
  //         {
  //           paddingTop: isSearchFocus ? 0 : 26
  //         }
  //       ]}
  //     >
  //       {isSearchFocus ? (
  //         <View style={{ flex: 1 }}>
  //           {searchData.keyword.length >= 3 ? (
  //             <SearchSuggestionList
  //               onPress={(k) =>
  //                 navigation.navigate('Details', {
  //                   keyword: k
  //                 })
  //               }
  //               keyword={searchData.keyword}
  //               data={searchData.suggestions}
  //             />
  //           ) : (
  //             <SimpleList
  //               onPress={(k) =>
  //                 navigation.navigate('Details', {
  //                   keyword: k
  //                 })
  //               }
  //               data={historyData.history}
  //             />
  //           )}
  //         </View>
  //       ) : (
  //         <ScrollView style={{ flex: 1 }}>
  //           <View style={styles.feedContainer}>
  //             <FeedCard
  //               title={'Bir Kelime'}
  //               data={homeData.data?.kelime}
  //               onPress={() =>
  //                 navigation.navigate('Details', {
  //                   keyword: homeData.data?.kelime.madde,
  //                   tabs: 'anlamlar'
  //                 })
  //               }
  //             />
  //             <View style={{ marginTop: 15 }}>
  //               <FeedCard
  //                 title={'Bir Deyim - Atasözü'}
  //                 data={homeData.data?.atasoz}
  //                 onPress={() =>
  //                   navigation.navigate('Details', {
  //                     keyword: homeData.data?.atasoz.madde,
  //                     tabs: 'atasozu'
  //                   })
  //                 }
  //               />
  //             </View>
  //           </View>
  //         </ScrollView>
  //       )}
  //     </View>
  //   </SafeAreaView>

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          width: Dimensions.get('screen').width,
          height: searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, Dimensions.get('screen').height / 3]
          }),
          opacity: searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }}
      >
        <ImageBackground
          source={bg}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>

      <View
        style={{
          height: 84,
          width: '100%',
          paddingHorizontal: 16
          // marginTop: -30
        }}
      >
        <Input
          style={styles.input}
          placeholder="Türkçe Sözlük'te Ara"
          placeholderTextColor="textMedium"
          onFocus={() => setIsSearchFocus(true)}
          value={searchData.keyword}
          onChangeText={(text) => searchData.setKeyword(text)}
        />
        <Button
          extraStyles={styles.closeButton}
          // onPress={onClear}
          pointerEvents="none"
          onPress={() => setIsSearchFocus(false)}
        >
          <Close width={20} height={20} color={theme.colors.textDark} />
        </Button>
        <Button
          style={styles.searchButton}
          pointerEvents="none"
          onPress={() => setIsSearchFocus(true)}
        >
          <Search color={theme.colors.textMedium} />
        </Button>

        <SpecialCharacters
          onCharPress={(char) => {
            searchData?.setKeyword(searchData?.keyword + char)
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    // backgroundColor: theme.colors.softRed
    // backgroundColor: 'yellow'

    // paddingTop: 64
  },
  input: {
    height: '60%',
    paddingLeft: 52,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    color: theme.colors.textDark,
    backgroundColor: 'white'
  },
  closeButton: {
    position: 'absolute',
    right: 32,
    top: 16
  },
  searchButton: {
    position: 'absolute',
    left: 32,
    top: 14
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
