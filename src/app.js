import 'react-native-gesture-handler'
import * as React from 'react'

import Navigation from './navigation'
import { HomeProvider, ResultsProvider } from './context/'

const App = () => {
  return (
    <ResultsProvider>
      <HomeProvider>
        <Navigation />
      </HomeProvider>
    </ResultsProvider>
  )
}

export default App
