import 'react-native-gesture-handler'
import * as React from 'react'

import Navigation from './navigation'
import { HomeProvider } from './context/'

const App = () => {
  return (
    <HomeProvider>
      <Navigation />
    </HomeProvider>
  )
}

export default App
