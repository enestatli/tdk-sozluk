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

  //   <View style={styles.container}>
  //   <View style={styles.secondContainer}>
  //     <View style={styles.inputFrame}>
  //       <Input
  //         style={[
  //           styles.input,
  //           isFocus && { borderColor: '#d1d1d1' },
  //           searchData.keyword !== '' && { borderColor: theme.colors.red }
  //         ]}
  //         placeholder="Türkçe Sözlük'te Ara"
  //         placeholderTextColor="textMedium" //TODO fix here
  //         onFocus={() => setIsFocus(true)}
  //         value={searchData.keyword}
  //         onChangeText={(text) => searchData.setKeyword(text)}
  //       />
  //       {searchData.keyword.length > 0 && (
  //         <Button
  //           extraStyles={styles.closeButton}
  //           onPress={onClear}
  //           pointerEvents="none"
  //         >
  //           <Close width={20} height={20} color={theme.colors.textDark} />
  //         </Button>
  //       )}
  //       <Button style={styles.searchButton} pointerEvents="none">
  //         <Search color={theme.colors.textMedium} />
  //       </Button>
  //     </View>

  //     {isFocus && (
  //       <Button style={styles.cancelButton} onPress={onCancel}>
  //         <Text>Vazgeç</Text>
  //       </Button>
  //     )}
  //   </View>
  //   {isFocus && (
  //     <Animated.View
  //       style={{
  //         marginTop: specialAnim.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: [0, 16]
  //         }),
  //         height: specialAnim.interpolate({
  //           inputRange: [0, 1],
  //           outputRange: [0, 48]
  //         })
  //       }}
  //     >
  //       <SpecialCharacters
  //         onCharPress={(char) => {
  //           searchData?.setKeyword(searchData?.keyword + char)
  //         }}
  //       />
  //     </Animated.View>
  //   )}
  // </View>

  return (
    <>
      <View
        style={[styles.searchBoxContainer, { marginTop: isFocus ? 10 : -30 }]}
      >
        <Input
          style={[
            styles.input,
            isFocus && { width: '80%', borderColor: '#d1d1d1' },
            searchData.keyword !== '' && { borderColor: theme.colors.red }
          ]}
          placeholder="Türkçe Sözlük'te Ara"
          placeholderTextColor="textMedium"
          onFocus={() => setIsFocus(true)}
          value={searchData.keyword}
          onChangeText={(text) => searchData.setKeyword(text)}
        />
        {searchData.keyword.length > 0 && (
          <Button
            extraStyles={styles.closeButton}
            onPress={onClear}
            pointerEvents="none"
          >
            <Close width={20} height={20} color={theme.colors.textDark} />
          </Button>
        )}

        <Button
          style={styles.searchButton}
          pointerEvents="none"
          onPress={() => setIsFocus(true)}
        >
          <Search color={theme.colors.textMedium} />
        </Button>

        {isFocus && (
          <Button style={styles.cancelButton} onPress={onCancel}>
            <Text>Vazgeç</Text>
          </Button>
        )}
      </View>
      {isFocus && (
        <Animated.View
          style={{
            marginTop: specialAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 6]
            }),
            height: specialAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 84 * 0.6]
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
    </>
  )
}

const styles = StyleSheet.create({
  searchBoxContainer: {
    height: 52,
    width: '100%',
    paddingHorizontal: 16,
    flexDirection: 'row'
  },
  input: {
    height: '100%',
    width: '100%',
    paddingLeft: 52,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    color: theme.colors.textDark,
    backgroundColor: 'white'
  },
  closeButton: {
    position: 'absolute',
    right: 106,
    top: 16
  },
  searchButton: {
    position: 'absolute',
    left: 32,
    top: 14
  },
  cancelButton: {
    height: '100%',
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default SearchBox
