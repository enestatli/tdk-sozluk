import 'react-native-gesture-handler'
import * as React from 'react'

import Navigation from './navigation'
import { HomeProvider, ResultsProvider, SearchProvider } from './context/'

const App = () => {
  return (
    <ResultsProvider>
      <HomeProvider>
        <SearchProvider>
          <Navigation />
        </SearchProvider>
      </HomeProvider>
    </ResultsProvider>
  )
}

export default App
