import * as React from 'react'
import codePush from 'react-native-code-push'

import Navigation from './navigation'

import {
  HomeProvider,
  ResultsProvider,
  SearchProvider,
  HistoryProvider,
  FavoriteProvider
} from './context/'

//TODO new splash screen from CodePushDemo!!!
//TODO fix css searchbox turkce characters box
//TODO react-native-sound link
//TODO enable proguard

const App = () => {
  React.useEffect(() => {
    codePush.sync({
      installMode: codePush.InstallMode.IMMEDIATE
    })
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
