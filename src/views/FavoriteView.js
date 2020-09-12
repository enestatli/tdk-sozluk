import React, { useContext, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, StatusBar, Platform, StyleSheet, Text } from 'react-native'

import { favoriteContext } from '../context'
import { Favorite } from '../components/icons'

import HeaderNavigation from '../components/HeaderNavigation'
import SimpleList from '../components/SimpleList'
import theme from '../utils/theme'

const FavoriteView = ({ navigation }) => {
  const favorites = useContext(favoriteContext)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
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
    <View style={styles.mainContainer}>
      <HeaderNavigation
        children={'Favoriler'}
        onPress={() => navigation.navigate('Search')}
      />

      <View style={styles.container}>
        {favorites.favorites.length > 0 ? (
          <View style={styles.simpleListContainer}>
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
          </View>
        ) : (
          <View style={styles.favoriteIconContainer}>
            <Favorite style={styles.favoriteIcon} />
            <Text style={styles.favoriIconText}>Henüz favori yok</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default FavoriteView

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: theme.colors.softRed
  },
  container: {
    flex: 1
  },
  simpleListContainer: {
    flex: 1,
    paddingBottom: 20
  },
  favoriteIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  favoriteIcon: {
    height: 48,
    width: 48,
    color: theme.colors.textLight
  },
  favoriIconText: {
    marginTop: 24,
    fontWeight: 'bold',
    color: theme.colors.textMedium
  }
})
