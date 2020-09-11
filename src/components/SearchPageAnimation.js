import React, { useEffect, useRef } from 'react'
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

import SearchBox from './SearchBox'
import bg from '../assets/bg.jpg'

import { Logo } from '../components/icons'

const heroHeight = Dimensions.get('window').height / 3

const SearchPageAnimation = ({ isSearchFocus, onSearchFocus }) => {
  const heroHeightAnim = useRef(new Animated.Value(heroHeight)).current

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
        <SearchBox onChangeFocus={(status) => onSearchFocus(status)} />
      </View>
    </Animated.View>
  )
}

export default SearchPageAnimation

const styles = StyleSheet.create({
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
  }
})
