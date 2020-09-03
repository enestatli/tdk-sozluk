/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect, useCallback } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  Text,
  StatusBar,
  Platform
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import theme from '../utils/theme'
import SearchBox from '../components/SearchBox'
import bg from '../assets/bg.jpg'

import { Logo } from '../components/icons'

const heroHeight = Dimensions.get('window').height / 3

const SearchView = ({ navigation }) => {
  const [isSearchFocus, setIsSearchFocus] = useState(false)
  const heroHeightAnim = useRef(new Animated.Value(heroHeight)).current

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
        <View style={[styles.searchBox, isSearchFocus && { top: 15 }]}>
          <SearchBox onChangeFocus={(status) => setIsSearchFocus(status)} />
        </View>
      </Animated.View>

      {isSearchFocus && (
        <View>
          <Text>History Items</Text>
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
  }
})

export default SearchView
