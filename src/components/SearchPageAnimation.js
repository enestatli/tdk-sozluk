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

const heroHeight = Dimensions.get('window').height / 3
// const heroHeight = 230

const SearchPageAnimation = ({ isSearchFocus, onSearchFocus }) => {
  const searchAnim = useRef(new Animated.Value(1)).current

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

  return (
    <View style={styles.animateBox}>
      <Animated.View
        style={{
          height: searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [84, heroHeight]
          })
        }}
      >
        <View style={styles.animateBox2}>
          <Animated.View
            style={{
              opacity: searchAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1]
              })
            }}
          >
            <ImageBackground source={bg} style={styles.image}>
              <View style={styles.logoContainer}>
                <Logo2 style={styles.logo} />
              </View>
            </ImageBackground>
          </Animated.View>
        </View>
        {/* TODO StatusBar.currentHeight / 10 isSearchfocus */}
        <View style={[styles.searchBox, { bottom: isSearchFocus ? -64 : -42 }]}>
          <SearchBox onChangeFocus={(status) => onSearchFocus(status)} />
        </View>
      </Animated.View>
    </View>
  )
}

export default SearchPageAnimation

const styles = StyleSheet.create({
  animateBox: {
    // height: heroHeight,
    zIndex: 1,
    position: 'relative'
  },
  animateBox2: {
    marginTop: 0 //TODO
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
    position: 'absolute',
    padding: 16,
    left: 0,
    width: '100%'
    // bottom: -Dimensions.get('window').height / 18
  }
})
