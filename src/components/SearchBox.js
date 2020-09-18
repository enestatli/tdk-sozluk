/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useContext, useRef } from 'react'
import { StyleSheet, View, Keyboard, Text, Animated } from 'react-native'

import theme from '../utils/theme'
import SpecialCharacters from './SpecialCharacters'

import { Input, Button } from './shared'
import { Close, Search } from './icons'
import { searchContext } from '../context'

const SearchBox = ({ onChangeFocus }) => {
  const [isFocus, setIsFocus] = useState(false)
  const searchData = useContext(searchContext)
  const specialAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    onChangeFocus(isFocus)
    if (isFocus) {
      Animated.timing(specialAnim, {
        toValue: 1,
        duration: 230,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(specialAnim, {
        toValue: 0,
        duration: 230,
        useNativeDriver: false
      }).start()
    }
  }, [specialAnim, isFocus, onChangeFocus])

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
      <View style={styles.secondContainer}>
        <View style={styles.inputFrame}>
          <Input
            style={[
              styles.input,
              isFocus && { borderColor: '#d1d1d1' },
              searchData.keyword !== '' && { borderColor: theme.colors.red }
            ]}
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
      {isFocus && (
        <Animated.View
          style={{
            marginTop: specialAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 16]
            }),
            height: specialAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 48]
            })
          }}
        >
          <SpecialCharacters
            onCharPress={(char) => {
              searchData?.setKeyword(searchData?.keyword + char)
            }}
          />
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: -16
  },
  secondContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16
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
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 4
    }
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
