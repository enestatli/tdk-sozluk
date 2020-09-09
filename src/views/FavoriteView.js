import React, { useContext, useState } from 'react'
import { View, Text } from 'react-native'
import { favoriteContext } from '../context'
import { Button } from '../components/shared'
import { Left, Bookmark } from '../components/icons'
import SimpleList from '../components/SimpleList'

const FavoriteView = ({ navigation }) => {
  const favorites = useContext(favoriteContext)

  const onLongPress = () => {
    favorites.setSelectable()
  }

  const onSelect = (item) => {
    if (favorites.selectedList.includes(item)) {
      favorites.updateSelectedList(
        favorites.selectedList.filter((el) => el !== item)
      )
    } else {
      favorites.updateSelectedList([...favorites.selectedList, item])
    }
  }

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
            onSelect={onSelect}
            selectedList={favorites.selectedList}
            selectable={favorites.isSelectable}
            onLongPress={onLongPress}
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
