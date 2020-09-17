import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import TabBar from './components/TabBar'
import theme from './utils/theme'

import { FavoriteView, HistoryView, SearchView, DetailView } from './views'
import { Button } from './components/shared'
import { Left, More } from './components/icons'
import { StyleSheet } from 'react-native'

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
          // console.log(route, 'from navigation.js')
          return {
            title:
              // Atasozleri ve Deyimler here
              (route.params?.keyword ?? '').slice(0, 15) +
              ((route.params?.keyword ?? '').length > 15 ? '...' : ''),
            headerStyle: styles.header,
            headerTitleAlign: 'center',
            headerLeft: () => (
              //TODO navigation, goBack()?
              <Button
                onPress={() => navigation.goBack()}
                extraStyles={styles.leftButton}
              >
                <Left style={styles.leftIcon} />
              </Button>
            ),
            headerRight: () => (
              <Button
                onPress={() => navigation.goBack()}
                extraStyles={styles.leftButton}
              >
                <More style={styles.leftIcon} />
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

const styles = StyleSheet.create({
  header: {
    backgroundColor: theme.colors.softRed,
    shadowColor: 'transparent',
    elevation: 0
  },
  leftButton: {
    paddingHorizontal: 20,
    height: '100%'
  },
  leftIcon: {
    width: 24,
    height: 24,
    color: theme.colors.textDark
  }
})
