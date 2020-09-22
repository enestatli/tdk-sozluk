import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import theme from '../utils/theme'

import { Button } from './shared'

const CHARACTERS = ['ç', 'ğ', 'ı', 'ö', 'ş', 'ü', 'â', 'î', 'û']

const SpecialCharacters = ({ children, onCharPress, ...props }) => {
  return (
    <View style={styles.container} {...props}>
      {CHARACTERS.map((char, index) => (
        <Button
          extraStyles={styles.charButton}
          key={index}
          onPress={() => onCharPress(char)}
        >
          <Text style={styles.charText}>{char}</Text>
        </Button>
      ))}
      {children}
    </View>
  )
}

export default SpecialCharacters

const styles = StyleSheet.create({
  container: {
    height: 48,
    flex: 1,
    width: '100%',
    backgroundColor: theme.colors.softGray,
    flexDirection: 'row',
    alignItems: 'center'
  },
  charButton: {
    flex: 1,
    height: '100%'
  },
  charText: {
    color: theme.colors.textMedium,
    fontWeight: 'bold'
  }
})
