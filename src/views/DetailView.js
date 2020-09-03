import React, { useCallback } from 'react'
import { View, Text, StatusBar, Platform, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import theme from '../utils/theme'
import FeedCard from '../components/FeedCard'
import { Card } from '../components/shared'
import ActionButton from '../components/ActionButton'
import { Sound, Favorite, Hand } from '../components/icons'

const DetailView = () => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.softRed)
    }, [])
  )
  return (
    <View style={styles.container}>
      <View>
        <Text>Title</Text>
        <Text>Keyword</Text>
        <View>
          <View style={styles.actionButtonsFrame}>
            <ActionButton>
              <Sound color="red" />
            </ActionButton>
            <ActionButton>
              <Favorite color="red" />
            </ActionButton>
            <ActionButton>
              <Hand color="red" />
              <ActionButton.Title>Title</ActionButton.Title>
            </ActionButton>
          </View>
          <View>
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </View>
        </View>
      </View>
    </View>
  )
}

export default DetailView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.softRed
  },
  actionButtonsFrame: {
    flexDirection: 'row',
    marginTop: 24
  }
})
