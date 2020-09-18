import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import theme from '../utils/theme'

import { Left } from './icons'
import { Button } from './shared'

const HeaderNavigation = ({ children, onPress }) => {
  return (
    <View style={styles.container}>
      <Button onPress={onPress} extraStyles={styles.button}>
        <Left style={styles.icon} />
      </Button>
      <Text style={styles.text}>{children}</Text>
    </View>
  )
}

export default HeaderNavigation

const styles = StyleSheet.create({
  container: {
    height: 44,
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 16,
    height: '100%'
  },
  icon: {
    height: 24,
    color: theme.colors.textDark
  },
  text: {
    fontSize: 14,
    color: theme.colors.textDark
  }
})
