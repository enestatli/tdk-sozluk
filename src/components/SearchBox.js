/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Keyboard, Text } from 'react-native'

import theme from '../utils/theme'

import { Input, Button } from './shared'
import { Close, Search } from './icons'
import { searchContext } from '../context'

const SearchBox = ({ onChangeFocus }) => {
  const [isFocus, setIsFocus] = useState(false)
  const searchData = useContext(searchContext)

  useEffect(() => {
    onChangeFocus(isFocus)
  }, [isFocus, onChangeFocus])

  const onCancel = () => {
    searchData.setKeyword('')
    setIsFocus(false)
    Keyboard.dismiss()
  }

  const onClear = () => {
    searchData.setKeyword('')
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputFrame}>
        <Input
          style={[styles.input, isFocus && { borderColor: '#d1d1d1' }]}
          placeholder="Türkçe Sözlük'te Ara"
          placeholderTextColor="textMedium" //TODO fix here
          onFocus={() => setIsFocus(true)}
          value={searchData.keyword}
          onChangeText={(text) => searchData.setKeyword(text)}
        />
        {searchData.keyword.length > 0 && (
          <Button
            style={styles.closeButton}
            onPress={onClear}
            pointerEvents="none"
          >
            <Close color={theme.colors.textDark} />
          </Button>
        )}
        <Button style={styles.searchButton} pointerEvents="none">
          <Search color={theme.colors.textMedium} />
        </Button>
      </View>

      {isFocus && (
        <Button style={styles.cancelButton} onPress={onCancel}>
          <Text>Vazgec</Text>
        </Button>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputFrame: {
    position: 'relative',
    flex: 1
  },
  input: {
    height: 52,
    paddingLeft: 52,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    color: theme.colors.textDark,
    backgroundColor: 'white'
  },
  closeButton: {
    position: 'absolute',
    right: 12,
    top: 14
  },
  searchButton: {
    position: 'absolute',
    left: 16,
    top: 14
  },
  cancelButton: {
    height: 52,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default SearchBox
