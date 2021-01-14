import * as React from 'react'
import codePush from 'react-native-code-push'
import RNBootSplash from 'react-native-bootsplash'

import Navigation from './navigation'

import {
  HomeProvider,
  ResultsProvider,
  SearchProvider,
  HistoryProvider,
  FavoriteProvider
} from './context/'

//TODO add your own bottom sheet modal
//TODO gradle prop same with newsApp apk crashes!!

const App = () => {
  React.useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE
    })
  }, [])

  React.useEffect(() => {
    ;(async () => {
      await RNBootSplash.hide({ fade: true })
    })()
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

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.IMMEDIATE
}

export default codePush(codePushOptions)(App)
