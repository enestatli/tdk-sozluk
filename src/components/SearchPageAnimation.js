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
    <Animated.View
      style={[
        styles.animateBox,
        {
          height: searchAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [84, heroHeight]
          })
        }
      ]}
    >
      <Animated.View
        style={[
          styles.animateBox2,
          {
            opacity: searchAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1]
            })
          }
        ]}
      >
        <ImageBackground source={bg} style={styles.image}>
          <View style={styles.logoContainer}>
            <Logo2 style={styles.logo} />
          </View>
        </ImageBackground>
      </Animated.View>

      <View style={[styles.searchBox, { bottom: isSearchFocus ? -64 : -42 }]}>
        <SearchBox onChangeFocus={(status) => onSearchFocus(status)} />
      </View>
    </Animated.View>
  )
}

export default SearchPageAnimation

const styles = StyleSheet.create({
  animateBox: {
    zIndex: 1,
    backgroundColor: 'blue'
  },
  animateBox2: {
    marginTop: -60
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
    backgroundColor: 'green',
    position: 'absolute',
    padding: 16,
    left: 0,
    width: '100%'
  }
})
