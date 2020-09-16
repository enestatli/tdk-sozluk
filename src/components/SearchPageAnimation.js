import React, { useEffect, useRef } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated
} from 'react-native'

import SearchBox from './SearchBox'
import bg from '../assets/bg.jpg'

import { Logo2 } from '../components/icons'

// const heroHeight = Dimensions.get('window').height / 3 //TODO
const heroHeight = 200

const SearchPageAnimation = ({ isSearchFocus, onSearchFocus }) => {
  const heroHeightAnim = useRef(new Animated.Value(heroHeight)).current
  const bgOpacity = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (isSearchFocus) {
      Animated.timing(bgOpacity, {
        toValue: 0,
        duration: 230,
        useNativeDriver: false
      }).start()
      Animated.timing(heroHeightAnim, {
        toValue: Dimensions.get('window').height / 8, //TODO
        duration: 230,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(bgOpacity, {
        toValue: 1,
        duration: 230,
        useNativeDriver: false
      }).start()
      Animated.timing(heroHeightAnim, {
        toValue: heroHeight,
        duration: 230,
        useNativeDriver: false
      }).start()
    }
  }, [isSearchFocus, heroHeightAnim, bgOpacity])

  return (
    <Animated.View style={[styles.animateBox, { height: heroHeightAnim }]}>
      <Animated.View style={[styles.animateBox2, { opacity: bgOpacity }]}>
        <ImageBackground source={bg} style={styles.image}>
          <View style={styles.logoContainer}>
            <Logo2 style={styles.logo} />
          </View>
        </ImageBackground>
      </Animated.View>
      {/* TODO StatusBar.currentHeight / 10 isSearchfocus */}
      <View style={[styles.searchBox, isSearchFocus && { bottom: 0 }]}>
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
  animateBox2: {
    marginTop: -60 //TODO
  },
  image: {
    width: '100%',
    height: '100%',
    paddingTop: 60,
    paddingBottom: 26
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 120,
    color: 'white',
    borderColor: 'yellow',
    borderWidth: 1
  },
  searchBox: {
    padding: 16,
    position: 'absolute',
    left: 0,
    width: '100%',
    bottom: -Dimensions.get('window').height / 18
  }
})
