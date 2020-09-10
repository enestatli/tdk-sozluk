import React, { createContext, useState, useEffect, useRef } from 'react'
import AsyncStorage from '@react-native-community/async-storage'
import BottomSheet from 'reanimated-bottom-sheet'
import FavoritesModal from '../components/FavoritesModal'

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
  const favoritesModalRef = useRef()

  useEffect(() => {
    AsyncStorage.getItem('favorites')
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
          favoritesModalRef.current.snapTo(1)
          favoritesModalRef.current.snapTo(1)
          setSelectedList([])
        } else {
          favoritesModalRef.current.snapTo(0)
          favoritesModalRef.current.snapTo(0)
        }
        setSelectable(status)
      } else {
        if (!isSelectable === false) {
          setSelectedList([])
          favoritesModalRef.current.snapTo(1)
          favoritesModalRef.current.snapTo(1)
        } else {
          favoritesModalRef.current.snapTo(0)
          favoritesModalRef.current.snapTo(0)
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
        favoritesModalRef.current.snapTo(1)
        favoritesModalRef.current.snapTo(1)
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
      <BottomSheet
        ref={favoritesModalRef}
        enabledGestureInteraction={true}
        snapPoints={[220, 0]}
        initialSnap={1}
        renderContent={() => <FavoritesModal />}
      />
    </favoriteContext.Provider>
  )
}

export { FavoriteProvider }

export default favoriteContext
