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
  const [hideSplash, setHideSplash] = React.useState(false)

  React.useEffect(() => {
    setTimeout(() => {
      setHideSplash(true)
    }, 100) // amount of time the splash is shown from the time component is rendered
  }, [])

  React.useEffect(() => {
    hideSplash && SplashScreen.hide()
  }, [hideSplash])
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
