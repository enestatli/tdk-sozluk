import React, { useCallback } from 'react'
import { View, Text, StatusBar, Platform } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import theme from '../utils/theme'

const DetailView = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.softRed)
    }, [])
  )
  return (
    <View>
      <Text>DetailView</Text>
    </View>
  )
}

export default DetailView
