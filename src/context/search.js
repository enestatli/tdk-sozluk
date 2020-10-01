import React, { createContext, useState, useCallback } from 'react'
import debounce from 'lodash.debounce'

import { getWordsList } from '../utils/api'

export const searchContextDefault = {
  data: {},
  suggestions: [],
  setKeyword: () => {}
}

const searchContext = createContext(searchContextDefault)

const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [lastDataType, setLastDataType] = useState('')

  const debouncedSearch = useCallback(
    debounce(
      async (k) => {
        const wordList = await getWordsList(k)
        setSuggestions(wordList.slice(0, 12))
      },
      500,
      { leading: true, maxWait: 600 }
    )
  )

  // const debouncedSearch = useCallback(
  //   debounce(
  //     (k) =>
  //       getWordsList(k).then((wordsList) => {
  //         setSuggestions(wordsList.slice(0, 12))
  //       }),
  //     500,
  //     { leading: true, maxWait: 600 }
  //   )
  // )

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
