import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const favoriteDefaultContext = {
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {}
}

const favoriteContext = createContext(favoriteDefaultContext)

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('favorite')
      .then((response) => {
        if (response !== null) {
          return JSON.parse(response)
        } else {
          return { data: [] }
        }
      })
      .then((result) => {
        setFavorites(result.data)
      })
      .catch((err) => {
        console.log('error while gettin favorite from asyncStorage', err)
      })
  }, [])

  const values = {
    favorites: favorites,
    addToFavorites: async (k) => {
      try {
        const item = { id: Date.now() + '', title: k }
        const newFavorites = [item, ...favorites]
        setFavorites(newFavorites)
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify({ data: newFavorites })
        )
      } catch {
        console.log('error while adding a new favorite item asyncStorage')
      }
    },
    removeFromFavorites: async (k) => {
      try {
        const newFavorites = favorites.filter((f) => f.title !== k)
        setFavorites(newFavorites)
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify({ data: newFavorites })
        )
      } catch {
        console.log(
          'error while removing one or more favorite items asyncStorage '
        )
      }
    }
  }

  return (
    <favoriteContext.Provider value={values}>
      {children}
    </favoriteContext.Provider>
  )
}

export { FavoriteProvider }

export default favoriteContext
