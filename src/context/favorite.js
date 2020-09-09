import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const favoriteDefaultContext = {
  favorites: [],
  addToFavorites: () => {},
  removeFromFavorites: () => {},
  isSelectable: false,
  selectedList: [],
  setSelectable: () => {},
  updateSelectedList: () => {},
  removeSelected: () => {}
}

const favoriteContext = createContext(favoriteDefaultContext)

const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])
  const [selectedList, setSelectedList] = useState([])
  const [isSelectable, setSelectable] = useState(false)

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
    isSelectable: isSelectable,
    selectedList: selectedList,
    setSelectable: (status) => {
      if (status !== undefined) {
        if (status === false) {
          setSelectedList([])
        } else {
        }
        setSelectable(status)
      } else {
        if (!isSelectable === false) {
          setSelectedList([])
        } else {
        }
        setSelectable(!isSelectable)
      }
    },
    updateSelectedList: (list) => {
      setSelectedList(list)
    },
    removeSelected: async () => {
      try {
        const newFavorites = favorites.filter((f) => !selectedList.includes(f))
        setFavorites(newFavorites)
        await AsyncStorage.setItem(
          'favorites',
          JSON.stringify({ data: newFavorites })
        )
        setSelectedList(false)
      } catch {
        console.log('error in multiple favorite remove asyncStorage')
      }
    },
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
