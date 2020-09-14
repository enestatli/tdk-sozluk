import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBar from './components/TabBar'
import theme from './utils/theme'

import { FavoriteView, HistoryView, SearchView, DetailView } from './views'
import { Button } from './components/shared'
import { Left, More } from './components/icons'

const HomeStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const SearchStack = ({ route, navigation }) => {
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
          console.log(route, 'from navigation.js')
          return {
            title:
              // Atasozleri ve Deyimler here
              (route.params?.keyword ?? '').slice(0, 15) +
              ((route.params?.keyword ?? '').length > 15 ? '...' : ''),
            headerStyle: {
              backgroundColor:
                route.params?.tabs === 'atasozu'
                  ? theme.colors.atasozleriLight
                  : theme.colors.softRed,
              elevation: 0,
              shadowColor: 'transparent'
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              //TODO navigation, goBack()?
              <Button
                onPress={() => navigation.goBack()}
                extraStyles={{ paddingHorizontal: 20, height: '100%' }}
              >
                <Left
                  style={{
                    width: 24,
                    height: 24,
                    color: theme.colors.textDark
                  }}
                />
              </Button>
            ),
            headerRight: () => (
              <Button
                onPress={() => navigation.goBack()}
                extraStyles={{ paddingHorizontal: 20, height: '100%' }}
              >
                <More
                  style={{
                    width: 24,
                    height: 24,
                    color: theme.colors.textDark
                  }}
                />
              </Button>
            )
          }
        }}
      />
    </HomeStack.Navigator>
  )
}

export default function TabNavigator() {
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
