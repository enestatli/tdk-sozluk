import React from 'react'
import { View, Text, Button } from 'react-native'

const SearchView = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search</Text>
      <Button
        title="go to details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  )
}

export default SearchView
