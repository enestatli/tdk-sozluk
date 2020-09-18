import React from 'react'
import { View, StyleSheet } from 'react-native'

import theme from '../utils/theme'

import { Search as SearchIcon, Bookmark, HistoryTestLogo } from './icons'
import { Button } from './shared'

const colors = theme.colors

const TabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (focusedOptions.tabBarVisible === false) {
    return null
  }

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key]
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name

        const isFocused = state.index === index

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true
          })

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name)
          }
        }

        return label === 'Search' ? (
          <View style={styles.searchButtonContainer} key={label}>
            <Button extraStyles={styles.searchButton} onPress={onPress}>
              <SearchIcon stroke="white" />
            </Button>
          </View>
        ) : (
          <Button
            extraStyles={styles.otherButtons}
            key={label}
            onPress={onPress}
          >
            {label === 'History' && (
              <HistoryTestLogo color={isFocused ? colors.red : colors.gray} />
            )}
            {label === 'Favorite' && (
              <Bookmark color={isFocused ? colors.red : colors.gray} />
            )}
            <View
              style={[
                styles.focused,
                isFocused && { backgroundColor: colors.red }
              ]}
            />
          </Button>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white'
    // paddingBottom: 15,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 1.41,
    // elevation: 2
  },
  searchButtonContainer: {
    padding: 15,
    marginTop: -15,
    backgroundColor: 'white',
    borderRadius: 9999
  },
  searchButton: {
    width: 56,
    height: 56,
    backgroundColor: colors.red
  },
  otherButtons: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 16,
    height: 56
  },
  focused: {
    width: 4,
    height: 4,
    marginTop: 6,
    backgroundColor: 'white'
  }
})

export default TabBar
