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
  TouchableOpacity
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

const SearchView = ({ route, navigation }) => {
  const homeData = useContext(homeContext)
  const searchData = useContext(searchContext)
  const historyData = useContext(historyContext)
  const [isSearchFocus, setIsSearchFocus] = useState(false)

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
      <View
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height / 3
        }}
      >
        <ImageBackground
          source={bg}
          style={{ width: '100%', height: '100%' }}
        />
      </View>

      <View
        style={{
          height: 52,
          width: '100%',
          paddingHorizontal: 16
          // marginTop: -30
        }}
      >
        <Input
          style={styles.input}
          placeholder="Türkçe Sözlük'te Ara"
          placeholderTextColor="textMedium"
          // onFocus={() => setIsFocus(true)}
          value={searchData.keyword}
          onChangeText={(text) => searchData.setKeyword(text)}
        />
        <Button
          extraStyles={styles.closeButton}
          // onPress={onClear}
          pointerEvents="none"
        >
          <Close width={20} height={20} color={theme.colors.textDark} />
        </Button>
        <Button style={styles.searchButton} pointerEvents="none">
          <Search color={theme.colors.textMedium} />
        </Button>
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
    height: '100%',
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
