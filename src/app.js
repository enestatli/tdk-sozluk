import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { FavoriteView, HistoryView, SearchView, DetailView } from './views'
import TabBar from './components/TabBar'
import theme from './utils/theme'
import { Button } from './components/shared'
import { Left, More } from './components/icons'

const HomeStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const SearchStack = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Search"
        component={SearchView}
        options={() => {
          return { headerShown: false }
        }}
      />
      <HomeStack.Screen
        name="Details"
        component={DetailView}
        options={({ route, navigation }) => {
          return {
            title: (route.params && route.params.title) || 'Bos',
            headerStyle: {
              backgroundColor: theme.colors.softRed,
              elevation: 0
            },
            headerLeft: () => (
              //TODO navigation
              <Button onPress={() => navigation.goBack()}>
                <Left color="red" />
              </Button>
            ),
            headerRight: () => (
              <Button onPress={() => navigation.goBack()}>
                <More color="red" />
              </Button>
            )
          }
        }}
      />
    </HomeStack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Search"
        tabBar={(props) => <TabBar {...props} />}
      >
        <Tab.Screen name="History" component={HistoryView} />
        <Tab.Screen name="Search" component={SearchStack} />
        <Tab.Screen name="Favorite" component={FavoriteView} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
