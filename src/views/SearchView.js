import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const SearchView = ({ navigation }) => {
  return (
    <View>
      <Text>Search</Text>
      <Button
        title="go to details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default SearchView
