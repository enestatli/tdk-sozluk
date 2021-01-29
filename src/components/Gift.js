import React from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Gift = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/bg.jpg')} />

      <TouchableOpacity style={styles.button}>
        <Text>Satın Al - 0.99 TRY</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Gift

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 200,
    height: 50
  },
  button: {
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: 'black',
    width: 150,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
