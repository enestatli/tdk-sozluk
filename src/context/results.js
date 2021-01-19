import React, { createContext, useState, useRef } from 'react'
import BottomSheet from 'reanimated-bottom-sheet'

import SignLanguage from '../components/SignLanguage'
import parseResult from '../utils/parseResult'
import BottomSheetModal from '../components/BottomSheetModal'

import { getDetailData, getSoundCode } from '../utils/api'

export const resultsContextDefault = {
  data: {},
  clearResults: {},
  getResults: {},
  sighnSheet: false,
  openSignSheet: () => {},
  closeSignSheet: () => {},
  soundCode: '',
  dataType: '',
  checkType: () => {}
}

const resultsContext = createContext(resultsContextDefault)

const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState({})
  const [signSheetStatus, setSignSheetStatus] = useState(false)
  const [signKeyword, setSignKeyword] = useState('')
  const [soundCode, setSoundCode] = useState('')
  const signSheetRef = useRef()

  const values = {
    data: results,
    soundCode: soundCode,
    signSheet: signSheetStatus,
    clearResults: () => {
      setResults({})
      setSignKeyword('')
      setSignSheetStatus(false)
    },
    openSignSheet: (k) => {
      setSignKeyword(k)
      setSignSheetStatus(true)
    },
    closeSignSheet: (k) => {
      setSignKeyword('')
      setSignSheetStatus(false)
    },
    getResults: async (keyword) => {
      setResults({})
      setSoundCode('')
      getDetailData(keyword)
        .then((res) => {
          setResults(parseResult(res[0]))
        })
        .catch((err) => {
          console.log('Error when fetching results', err)
        })
      getSoundCode(keyword)
        .then((res) => {
          setSoundCode(res?.[0]?.seskod ?? '')
        })
        .catch((err) => {
          console.log('error when fetching soundCode:', err)
        })
    }
  }

  return (
    <resultsContext.Provider value={values}>
      {children}
      <BottomSheetModal
        visible={signSheetStatus}
        closeBottomSheet={() => setSignSheetStatus((f) => !f)}
      >
        <SignLanguage keyword={signKeyword} />
      </BottomSheetModal>
    </resultsContext.Provider>
  )
}

export { ResultsProvider }

export default resultsContext
