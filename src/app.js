import 'react-native-gesture-handler'
import * as React from 'react'

import Navigation from './navigation'
import {
  HomeProvider,
  ResultsProvider,
  SearchProvider,
  HistoryProvider,
  FavoriteProvider
} from './context/'

// TODO SafeAreaProvider will be added

const App = () => {
  return (
    <FavoriteProvider>
      <HistoryProvider>
        <ResultsProvider>
          <HomeProvider>
            <SearchProvider>
              <Navigation />
            </SearchProvider>
          </HomeProvider>
        </ResultsProvider>
      </HistoryProvider>
    </FavoriteProvider>
  )
}

export default App
