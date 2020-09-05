import React, { createContext, useState } from 'react'
import { getDetailData } from '../utils/api'

export const resultsContextDefault = {
  data: {},
  clearResults: {},
  getResults: {}
}

const resultsContext = createContext(resultsContextDefault)

const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState({})

  const values = {
    data: results,
    clearResults: () => {
      setResults({})
    },
    getResults: async (keyword) => {
      getDetailData(keyword)
        .then((res) => {
          setResults(res[0])
        })
        .catch((err) => {
          console.log('Error when fetching results', err)
        })
    }
  }

  return (
    <resultsContext.Provider value={values}>{children}</resultsContext.Provider>
  )
}

export { ResultsProvider }

export default resultsContext
