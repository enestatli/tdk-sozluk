import React, { createContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export const historyDefaultContext = {
  data: {},
  addToHistory: () => {}
}

const historyContext = createContext(historyDefaultContext)

const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('history')
      .then((response) => {
        if (response !== null) {
          return JSON.parse(response)
        } else {
          return { data: [] }
        }
      })
      .then((result) => {
        setHistory(result.data)
      })
      .catch((err) => {
        console.log('error when getting history from asyncStorage', err)
      })
  }, [])

  const values = {
    history: history,
    addToHistory: async (k) => {
      try {
        const item = { id: Date.now() + '', title: k }
        const newHistory = [
          ...history.filter((el) => el.title !== item.title),
          item
        ].reverse()
        console.log(newHistory, 'newHistory')
        setHistory(newHistory)
        await AsyncStorage.setItem(
          'history',
          JSON.stringify({ data: newHistory })
        )
      } catch {
        console.log('error in history asyncStorage')
      }
    }
  }

  return (
    <historyContext.Provider value={values}>{children}</historyContext.Provider>
  )
}

export { HistoryProvider }

export default historyContext
