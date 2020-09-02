import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Search as SearchIcon, RotateCcw, Bookmark } from './icons'
import { Button } from './shared'

import theme from '../utils/theme'

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
            <Button style={styles.searchButton} onPress={onPress}>
              <SearchIcon color={colors.gray} />
            </Button>
          </View>
        ) : (
          <Button style={styles.otherButtons} key={label} onPress={onPress}>
            {label === 'History' && <RotateCcw color={colors.gray} />}
            {label === 'Favorite' && <Bookmark color={colors.gray} />}
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
    flexDirection: 'row'
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
    backgroundColor: colors.red,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9999
  },
  otherButtons: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 6,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center'
  },
  focused: {
    width: 3,
    height: 3,
    marginTop: 6
  }
})

export default TabBar
