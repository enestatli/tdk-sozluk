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
// TODO Card text, title should textDark not light
// TODO EDIT conditional ActionButtons styles, styles.action should be read
// TODO ADD SuggestionList border!
//TODO EDIT DetailCard FeedCard(mb), padding, margin styles
//TODO EDIT Text fontWeight, color
//TODO EDIT yOffset ToastAndroid based on dimension of the window

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
