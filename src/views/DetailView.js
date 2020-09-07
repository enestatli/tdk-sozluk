import React, { useCallback, useEffect, useContext } from 'react'
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

import ActionButton from '../components/ActionButton'
import DetailCard from '../components/DetailCard'

import { Sound, Favorite, Hand, FavoriteSolid } from '../components/icons'
import { resultsContext, historyContext, favoriteContext } from '../context'
import throttle from 'lodash.throttle'

const DetailView = ({ route, navigation }) => {
  const keyword = route.params?.keyword
  const resultsData = useContext(resultsContext)
  const history = useContext(historyContext)
  const favorites = useContext(favoriteContext)
  const isFavorited = favorites.favorites.find((f) => f.title === keyword)

  useEffect(() => {
    if (!history.history.find((el) => el.title === keyword)) {
      history.addToHistory(keyword)
    }
    resultsData.getResults(keyword)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.softRed)
      return () => {
        resultsData.clearResults()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <ActionButton
              onPress={throttle(() => {
                isFavorited
                  ? favorites.removeFromFavorites(keyword)
                  : favorites.addToFavorites(keyword)
              }, 500)}
            >
              {isFavorited ? (
                <FavoriteSolid color="red" />
              ) : (
                <Favorite color="black" />
              )}
            </ActionButton>
            <ActionButton
              disabled={keyword ? false : true}
              onPress={throttle(() => {
                resultsData.signSheet
                  ? resultsData.closeSignSheet()
                  : resultsData.openSignSheet(keyword)
              }, 500)}
            >
              <Hand color="red" />
              <ActionButton.Title>Sign Language</ActionButton.Title>
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
