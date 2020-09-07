import React, { createContext, useState, useRef } from 'react'
import BottomSheet from 'reanimated-bottom-sheet'

import SignLanguage from '../components/SignLanguage'

import { getDetailData } from '../utils/api'

export const resultsContextDefault = {
  data: {},
  clearResults: {},
  getResults: {},
  sighnSheet: false,
  openSignSheet: () => {},
  closeSignSheet: () => {}
}

const resultsContext = createContext(resultsContextDefault)

const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState({})
  const [signSheetStatus, setSignSheetStatus] = useState(false)
  const [signKeyword, setSignKeyword] = useState('')
  const signSheetRef = useRef()

  const values = {
    data: results,
    signSheet: signSheetStatus,
    clearResults: () => {
      setResults({})
      signSheetRef.current.snapTo(1)
      signSheetRef.current.snapTo(1)
      setSignKeyword('')
      setSignSheetStatus(false)
    },
    openSignSheet: (k) => {
      signSheetRef.current.snapTo(0)
      signSheetRef.current.snapTo(0)
      setSignKeyword(k)
      setSignSheetStatus(true)
    },
    closeSignSheet: (k) => {
      signSheetRef.current.snapTo(1)
      signSheetRef.current.snapTo(1)
      setSignKeyword('')
      setSignSheetStatus(false)
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
    <resultsContext.Provider value={values}>
      {children}
      <BottomSheet
        ref={signSheetRef}
        onCloseEnd={() => {
          setSignKeyword('')
          setSignSheetStatus(false)
        }}
        snapPoints={[302, 0]}
        initialSnap={1}
        renderContent={() => <SignLanguage keyword={signKeyword} />}
      />
    </resultsContext.Provider>
  )
}

export { ResultsProvider }

export default resultsContext
