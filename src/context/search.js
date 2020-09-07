import React, { createContext, useState, useCallback } from 'react'
import { getSuggestions } from '../utils/autoComplete'
import throttle from 'lodash.throttle'

export const searchContextDefault = {
  data: {},
  suggestions: [],
  setKeyword: () => {}
}

const searchContext = createContext(searchContextDefault)

const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('')
  const [suggestions, setSuggestions] = useState([])

  const throttledSearch = useCallback(
    throttle((k) => getSuggestions(k).slice(0, 12), 500),
    []
  )

  const values = {
    keyword: keyword,
    suggestions: suggestions,
    setKeyword: (k) => {
      setKeyword(k)
      if (k.length >= 3) {
        setSuggestions(throttledSearch(k))
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
