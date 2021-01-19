import React, { useContext, useEffect, useRef } from 'react'
import {
  Animated,
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  StyleSheet
} from 'react-native'

const BottomSheet = ({ visible, closeBottomSheet, children, ...props }) => {
  const panY = useRef(new Animated.Value(Dimensions.get('screen').height))
    .current

  const _resetPositionAnim = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: false
  })

  const _closeAnim = Animated.timing(panY, {
    toValue: Dimensions.get('screen').height,
    duration: 300,
    useNativeDriver: false
  })

  const top = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1]
  })

  const _panResponders = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => false,
    onPanResponderMove: Animated.event([null, { dy: panY }], {
      useNativeDriver: false
    }),
    onPanResponderRelease: (e, gs) => {
      if (gs.dy > 0 && gs.vy > 2) {
        return _closeAnim.start(() => closeBottomSheet())
      }
      return _resetPositionAnim.start()
    }
  })

  useEffect(() => {
    if (visible) {
      _resetPositionAnim.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  return (
    <Modal
      animationType="fade"
      visible={visible}
      transparent={true}
      onRequestClose={closeBottomSheet}
      statusBarTranslucent={true}
    >
      <KeyboardAvoidingView
        style={[
          styles.overlay,
          {
            // backgroundColor: visible && 'rgba(56,56,56,0.8)',
            justifyContent: 'flex-end'
          }
        ]}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Animated.View
          style={[
            styles.container,
            {
              top,
              flex: 0.4,
              paddingTop: 12
            }
          ]}
          {..._panResponders.panHandlers}
        >
          {children}
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

export default BottomSheet

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end'
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomEndRadius: 6,
    borderBottomLeftRadius: 6,
    flex: 0.5
  }
})
