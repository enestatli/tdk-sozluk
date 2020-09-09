import React, { useContext, useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, Text, StatusBar, Platform } from 'react-native'
import { favoriteContext } from '../context'
import { Button } from '../components/shared'
import { Left, Bookmark } from '../components/icons'
import SimpleList from '../components/SimpleList'
import theme from '../utils/theme'

const FavoriteView = ({ navigation }) => {
  const favorites = useContext(favoriteContext)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      //TODO setbgcolor to theme.colors.softRed
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.softRed)
      return () => {
        favorites.setSelectable(false)
        favorites.updateSelectedList([])
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  )

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
