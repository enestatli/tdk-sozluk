/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { View, Button, StyleSheet } from 'react-native'
import { Logo } from '../components/icons'
import theme from '../utils/theme'
import SearchBox from '../components/SearchBox'

const SearchView = ({ navigation }) => {
  return (
    <View>
      <View style={styles.logo}>
        <Logo color={theme.colors.red} />
      </View>

      <View style={styles.searchBox}>
        <SearchBox />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    paddingVertical: 20,
    alignItems: 'center'
  },
  searchBox: {
    padding: 20
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SearchView
