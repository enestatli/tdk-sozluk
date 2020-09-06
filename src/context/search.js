import React, { createContext, useState } from 'react'
import { getSuggestions } from '../utils/autoComplete'

export const searchContextDefault = {
  data: {},
  setKeyword: () => {},
  getSuggestions: () => {}
}

const searchContext = createContext(searchContextDefault)

const SearchProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('')

  const values = {
    keyword: keyword,
    setKeyword: (k) => {
      setKeyword(k)
    },
    getSuggestions: (limit = 10) => {
      return getSuggestions(keyword).slice(0, limit)
    }
  }

  return (
    <searchContext.Provider value={values}>{children}</searchContext.Provider>
  )
}

export { SearchProvider }

export default searchContext
