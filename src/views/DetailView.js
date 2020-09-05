import React, { useCallback, useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import theme from '../utils/theme'
import FeedCard from '../components/FeedCard'
import ActionButton from '../components/ActionButton'
import DetailCard from '../components/DetailCard'

import { Sound, Favorite, Hand } from '../components/icons'
import { resultsContext } from '../context'

const DetailView = ({ route, navigation }) => {
  // const keyword = route.params.keyword
  const keyword = 'gelmek'
  const resultsData = useContext(resultsContext)

  useEffect(() => {
    resultsData.getResults(keyword)
  }, [])

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
        {/* TODO */}
        <Text>{keyword}</Text>
        <Text>lisan</Text>
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
          {/* TODO make it FlatList */}
          <ScrollView>
            {(resultsData.data?.anlamlarListe ?? [1, 2, 3]).map((item) => (
              <DetailCard
                data={typeof item === 'number' ? undefined : item}
                key={item?.anlam_sira ?? item}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

export default DetailView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: theme.colors.softRed
  },
  actionButtonsFrame: {
    flexDirection: 'row',
    marginTop: 24
  }
})
