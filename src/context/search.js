import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const searchContextDefault = {
  data: {},
  suggestions: [],
  setKeyword: () => {}
}

const searchContext = createContext(searchContextDefault)

const autoCompleteUrl = 'https://sozluk.gov.tr/autocomplete.json'

const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [lastDataType, setLastDataType] = useState('')

  React.useEffect(() => {
    ;(async () => {
      if (await checkStore()) {
        return
      }

      await storeWordsList()
    })()
  }, [])

  const fetchWordsList = async () => {
    try {
      const response = await fetch(autoCompleteUrl)
      const data = await response.json()
      const list = data.map((item) => item.madde)
      return list
    } catch (error) {
      console.log('fetchWordsList', error.message)
    }
  }

  const checkStore = async () => {
    try {
      const wordsList = await AsyncStorage.getItem('words_list')
      if (wordsList !== null) {
        return true
      }
    } catch (error) {
      console.log('checkStore', error.message)
    }
  }

  const storeWordsList = async () => {
    try {
      const fetchList = await fetchWordsList()
      const wordsList = JSON.stringify(fetchList)
      await AsyncStorage.setItem('words_list', wordsList)
    } catch (error) {
      console.log('storeWordsList', error.message)
    }
  }

  const getWordsListFromStorage = async () => {
    const storedWordsList = await AsyncStorage.getItem('words_list')
    const parsedWordsList = JSON.parse(storedWordsList)
    return parsedWordsList
  }

  const getSuggestions = async (keyword) => {
    const data = await getWordsListFromStorage()
    return data.filter((item) =>
      item.startsWith(keyword.toLocaleLowerCase('tr'))
    )
  }

  const debouncedSearch = async (k) => {
    try {
      if (await checkStore()) {
        const getSuggestionsList = await getSuggestions(k)
        setSuggestions(getSuggestionsList.slice(0, 12))
      }
    } catch (error) {
      console.log('debounchedSearch', error.message)
    }
  }

  const values = {
    keyword: keyword,
    suggestions: suggestions,
    lastDataType: lastDataType,
    setLastDataType: setLastDataType,
    setKeyword: (k) => {
      setKeyword(k)
      if (k.length >= 3) {
        debouncedSearch(k)
      } else {
        setSuggestions([])
      }
    }
  }

  return (
    <searchContext.Provider value={values}>{children}</searchContext.Provider>
  )
}

export { SearchProvider }

export default searchContext
