import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import bg from '../assets/bg.jpg'

const Splash = ({ navigation }) => {
  return (
    <LinearGradient style={styles.home} colors={['black', 'red']}>
      <Image source={bg} resizeMode="contain" style={{ width: 200 }} />
    </LinearGradient>
  )
}

export default Splash

const styles = StyleSheet.create({
  home: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
