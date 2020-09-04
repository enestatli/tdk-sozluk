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
import { homeContext } from '../context'

const heroHeight = Dimensions.get('window').height / 3

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
)

const flatListData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item'
  }
]

const SearchView = ({ navigation }) => {
  const homeData = useContext(homeContext)
  const [isSearchFocus, setIsSearchFocus] = useState(false)
  const heroHeightAnim = useRef(new Animated.Value(heroHeight)).current

  useEffect(() => {
    homeData.setData()
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

  const renderItem = ({ item }) => <Item title={item.title} />

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

      {isSearchFocus ? (
        <View style={styles.historyList}>
          <FlatList
            data={flatListData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View style={styles.feedContainer}>
          <FeedCard data={homeData?.data} navigation={navigation} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.softRed
  },
  animateBox: {
    height: heroHeight
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
    padding: 16,
    marginTop: 48
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
