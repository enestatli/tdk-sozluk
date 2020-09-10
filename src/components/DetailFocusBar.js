import React, { useRef, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Button } from './shared'
import theme from '../utils/theme'

const DetailFocusBar = ({ tabs, selected, onPress }) => {
  const listRef = useRef()

  useEffect(() => {
    listRef.current.scrollToIndex({
      index: tabs.findIndex((el) => el.id === selected)
    })
  }, [selected, tabs])

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        style={{ width: '100%', height: '100%' }}
        horizontal={true}
        data={tabs}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.tabsContainer}>
            <Button
              extraStyles={styles.button}
              onPress={() => {
                onPress(item.id)
                listRef.current.scrollToIndex({
                  index: tabs.findIndex((el) => el === item)
                })
              }}
            >
              <Text
                style={[
                  styles.tabsText,
                  selected === item.id && { color: theme.colors.textDark }
                ]}
              >
                {item.title}
              </Text>
            </Button>

            {selected === item.id && <View style={styles.tabsBottomBorder} />}
          </View>
        )}
      />
    </View>
  )
}

export default DetailFocusBar

const styles = StyleSheet.create({
  container: {
    height: 24,
    marginTop: 28,
    marginBottom: 8,
    width: '100%'
  },
  tabsContainer: {
    paddingHorizontal: 16,
    flex: 1,
    height: 24
  },
  button: {
    width: '100%'
  },
  tabsText: {
    fontWeight: 'bold',
    color: theme.colors.textLight
  },
  tabsBottomBorder: {
    height: 2,
    width: 24,
    backgroundColor: theme.colors.red,
    marginHorizontal: 'auto',
    marginTop: 'auto'
  }
})
