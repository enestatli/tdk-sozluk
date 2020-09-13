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

// TODO SafeAreaProvider will be added
// TODO SearchView backgroundImage should be fixed
// TODO Move SplashScreen to Splash.js

const App = () => {
  SplashScreen.hide()
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
