import React, { createContext, useState, useRef } from 'react'
import BottomSheet from 'reanimated-bottom-sheet'

import SignLanguage from '../components/SignLanguage'

import { getDetailData, getSoundCode } from '../utils/api'
import parseResult from '../utils/parseResult'

export const resultsContextDefault = {
  data: {},
  clearResults: {},
  getResults: {},
  sighnSheet: false,
  openSignSheet: () => {},
  closeSignSheet: () => {},
  soundCode: '',
  dataType: ''
}

const resultsContext = createContext(resultsContextDefault)

const ResultsProvider = ({ children }) => {
  const [results, setResults] = useState({})
  const [signSheetStatus, setSignSheetStatus] = useState(false)
  const [signKeyword, setSignKeyword] = useState('')
  const [soundCode, setSoundCode] = useState('')
  const [dataType, setDataType] = useState('XXX')
  const signSheetRef = useRef()

  const values = {
    data: results,
    soundCode: soundCode,
    signSheet: signSheetStatus,
    dataType: dataType,
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
      setResults({})
      setSoundCode('')
      getDetailData(keyword)
        .then((res) => {
          // setResults(res[0])
          setResults(parseResult(res[0]))
          // const parsed = parseResult(res[0])
          // console.log(parsed?.atasozu.birlesikler)
          // if (
          //   (parsed?.telaffuz === undefined || parsed?.lisan === '') &&
          //   parsed.birlesikler?.length === 0 &&
          //   parsed.atasozu?.length > 0
          // ) {
          //   setDataType('atasozu')
          // } else if (
          //   (parsed?.telaffuz === undefined || parsed?.lisan === '') &&
          //   parsed.atasozu?.length === 0 &&
          //   parsed.birlesikler?.length > 0
          // ) {
          //   setDataType('birlesikler')
          // } else {
          //   setDataType('anlamlar')
          // }
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
