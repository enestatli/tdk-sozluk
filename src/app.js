import 'react-native-gesture-handler'
import * as React from 'react'

import Navigation from './navigation'
import {
  HomeProvider,
  ResultsProvider,
  SearchProvider,
  HistoryProvider
} from './context/'

const App = () => {
  return (
    <HistoryProvider>
      <ResultsProvider>
        <HomeProvider>
          <SearchProvider>
            <Navigation />
          </SearchProvider>
        </HomeProvider>
      </ResultsProvider>
    </HistoryProvider>
  )
}

export default App
