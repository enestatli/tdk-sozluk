import 'react-native-gesture-handler'
import * as React from 'react'
import SplashScreen from 'react-native-splash-screen'

import Navigation from './navigation'

import {
  HomeProvider,
  ResultsProvider,
  SearchProvider,
  HistoryProvider,
  FavoriteProvider
} from './context/'

const App = () => {
  React.useEffect(() => {
    SplashScreen.hide()
  }, [])

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
