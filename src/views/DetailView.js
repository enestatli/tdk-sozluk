import React, {
  useCallback,
  useEffect,
  useContext,
  useState,
  useRef
} from 'react'
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  ScrollView
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Sound from 'react-native-sound'

import theme from '../utils/theme'

import ActionButton from '../components/ActionButton'
import DetailCard from '../components/DetailCard'

import {
  Sound as SoundIcon,
  Favorite,
  Hand,
  FavoriteSolid
} from '../components/icons'
import { resultsContext, historyContext, favoriteContext } from '../context'
import throttle from 'lodash.throttle'

const DetailView = ({ route, navigation }) => {
  const keyword = route.params?.keyword
  const resultsData = useContext(resultsContext)
  const history = useContext(historyContext)
  const favorites = useContext(favoriteContext)
  const isFavorited = favorites.favorites.find((f) => f.title === keyword)

  const playSound = throttle(() => {
    const track = new Sound(
      `https://sozluk.gov.tr/ses/${resultsData?.soundCode}.wav`,
      '',
      (error) => {
        if (error) {
          console.log('error loading track', error)
        } else {
          track.play(() => {
            track.release()
          })
        }
      }
    )
  }, 1000)

  useEffect(() => {
    history.addToHistory(keyword)
    resultsData.getResults(keyword)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

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
        <Text>
          {resultsData.data?.telaffuz ? resultsData.data?.telaffuz + ' ' : ''}
          {resultsData.data?.lisan ?? ''}
        </Text>
        <View>
          <View style={styles.actionButtonsFrame}>
            <ActionButton
              disabled={resultsData?.soundCode.length === 0}
              onPress={playSound}
            >
              <SoundIcon
                color={
                  resultsData?.soundCode.length > 0
                    ? theme.colors.textLight
                    : theme.colors.softRed
                }
              />
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
          <View style={styles.detailCards}>
            <ScrollView>
              {(resultsData.data?.anlamlar ?? [1, 2, 3]).map((item) => (
                <DetailCard
                  data={typeof item === 'number' ? undefined : item}
                  key={item?.id ?? item}
                />
              ))}
            </ScrollView>
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
    padding: 16,
    backgroundColor: theme.colors.softRed
  },
  actionButtonsFrame: {
    flexDirection: 'row',
    marginTop: 24
  },
  detailCards: {
    marginTop: 20
  }
})
