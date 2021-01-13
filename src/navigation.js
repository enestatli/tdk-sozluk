import * as React from 'react'
import { StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBar from './components/TabBar'
import theme from './utils/theme'

import { FavoriteView, HistoryView, SearchView, DetailView } from './views'
import { Button } from './components/shared'
import { Left } from './components/icons'
import { searchContext } from './context'

const HomeStack = createStackNavigator()
const Tab = createBottomTabNavigator()

const SearchStack = ({ route, navigation }) => {
  const search = React.useContext(searchContext)

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
            title:
              search?.lastDataType === 'atasozu'
                ? 'Atasözleri ve Deyimler'
                : (route.params?.keyword ?? '').slice(0, 15) +
                  ((route.params?.keyword ?? '').length > 15 ? '...' : ''),
            headerStyle: {
              backgroundColor:
                search?.lastDataType === 'atasozu'
                  ? theme.colors.atasozleriLight
                  : theme.colors.softRed,
              shadowColor: 'transparent',
              elevation: 0
            },
            headerTitleStyle: {
              fontWeight: '500',
              fontSize: 14,
              lineHeight: 22
            },
            headerTitleAlign: 'center',
            headerLeft: () => (
              <Button
                onPress={() => navigation.goBack()}
                extraStyles={styles.leftButton}
              >
                <Left style={styles.leftIcon} />
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
        tabBarOptions={{ keyboardHidesTabBar: true }}
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

// const styles = StyleSheet.create({
//   leftButton: {
//     paddingHorizontal: 20,
//     height: '100%'
//   },
//   leftIcon: {
//     width: 24,
//     height: 24,
//     color: theme.colors.textDark
//   }
// })
