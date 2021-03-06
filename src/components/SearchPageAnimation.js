import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Animated,
  TouchableOpacity
} from 'react-native'

import SearchBox from './SearchBox'
import bg from '../assets/bg.jpg'

import { Ellipsis, Logo2 } from '../components/icons'
import BottomSheet from './BottomSheetModal'
import Gift from './Gift'

const HERO_HEIGHT = Dimensions.get('screen').height / 3

const SearchPageAnimation = ({ isSearchFocus, onSearchFocus }) => {
  const opaictyAnim = React.useRef(new Animated.Value(1)).current
  const heroAnim = React.useRef(new Animated.Value(HERO_HEIGHT)).current

  const [showPurchaseModal, setshowPurchaseModal] = React.useState(false)

  useEffect(() => {
    if (isSearchFocus) {
      Animated.timing(opaictyAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(opaictyAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: false
      }).start()
    }
  }, [opaictyAnim, isSearchFocus])

  useEffect(() => {
    if (isSearchFocus) {
      Animated.timing(heroAnim, {
        toValue: 0,
        duration: 355,
        useNativeDriver: false
      }).start()
    } else {
      Animated.timing(heroAnim, {
        toValue: HERO_HEIGHT,
        duration: 355,
        useNativeDriver: false
      }).start()
    }
  }, [heroAnim, isSearchFocus])

  return (
    <>
      <Animated.View
        style={{
          width: Dimensions.get('screen').width,
          height: heroAnim,
          opacity: opaictyAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }}
      >
        <ImageBackground source={bg} style={{ width: '100%', height: '100%' }}>
          <View style={styles.logoContainer}>
            <Logo2 />
          </View>
          <TouchableOpacity
            style={{ position: 'absolute', top: 0, right: 20 }}
            onPress={() => setshowPurchaseModal((f) => !f)}
          >
            <Ellipsis size={24} color="white" />
          </TouchableOpacity>
        </ImageBackground>
      </Animated.View>

      <BottomSheet
        visible={showPurchaseModal}
        closeBottomSheet={() => setshowPurchaseModal((f) => !f)}
      >
        <Gift />
      </BottomSheet>

      <SearchBox onChangeFocus={(status) => onSearchFocus(status)} />
    </>
  )
}

export default SearchPageAnimation

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
