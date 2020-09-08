import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { favoriteContext } from '../context'
import { Button } from '../components/shared'
import { Left, Bookmark } from '../components/icons'
import SimpleList from '../components/SimpleList'

const FavoriteView = ({ navigation }) => {
  const favorites = useContext(favoriteContext)

  return (
    <View>
      <View>
        <Button>
          <Left color="red" />
          <Text>FavoriteView</Text>
        </Button>
      </View>

      <View>
        {favorites.favorites.length > 0 ? (
          <SimpleList
            hasHeader={false}
            chevron={true}
            onPress={(k) => navigation.navigate('Details', { keyword: k })}
            data={favorites.favorites}
          />
        ) : (
          <View>
            <Bookmark color="blue" />
          </View>
        )}
      </View>
    </View>
  )
}

export default FavoriteView
