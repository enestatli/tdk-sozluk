import React, { useCallback, useEffect, useContext, useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Sound from 'react-native-sound'

import theme from '../utils/theme'

import ActionButton from '../components/ActionButton'
import DetailCard from '../components/DetailCard'

import {
  Sound as SoundIcon,
  SoundSolid,
  Favorite,
  Hand,
  FavoriteSolid
} from '../components/icons'
import { resultsContext, historyContext, favoriteContext } from '../context'
import throttle from 'lodash.throttle'
import DetailFocusBar from '../components/DetailFocusBar'

const tabs = [
  {
    id: 'anlamlar',
    title: 'Açıklama'
  },
  {
    id: 'atasozu',
    title: ' Atasözleri & Deyimler'
  },
  {
    id: 'birlesikler',
    title: 'Birleşik Kelimeler'
  }
]

const DetailView = ({ route, navigation }) => {
  const keyword = route.params?.keyword
  const resultsData = useContext(resultsContext)
  const history = useContext(historyContext)
  const favorites = useContext(favoriteContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedTab, setSelectedTab] = useState(tabs[0].id)
  const isFavorited = favorites.favorites.find((f) => f.title === keyword)

  const playSound = throttle(() => {
    const track = new Sound(
      `https://sozluk.gov.tr/ses/${resultsData?.soundCode}.wav`,
      '',
      (error) => {
        if (error) {
          console.log('error loading track', error)
        } else {
          setIsPlaying(true)
          track.play((s) => {
            setIsPlaying(false)
          })
        }
      }
    )
  }, 1000)

  useEffect(() => {
    history.addToHistory(keyword)
    resultsData.getResults(keyword)
    setSelectedTab(tabs[0].id)
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
  useFocusEffect(
    useCallback(() => {
      resultsData.getResults(keyword)
      return () => {
        resultsData.clearResults()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [keyword])
  )

  return (
    <View style={styles.container}>
      {/* Focus Bar */}
      <DetailFocusBar
        onPress={(id) => setSelectedTab(id)}
        tabs={tabs}
        selected={selectedTab}
      />
      <View>
        {/* Keyword, lisan*/}
        <Text>{keyword}</Text>
        <Text>
          {resultsData.data?.telaffuz ? resultsData.data?.telaffuz + ' ' : ''}
          {resultsData.data?.lisan ?? ''}
        </Text>
        {/* Action Buttons */}

        <View style={styles.actionButtonsFrame}>
          <ActionButton
            disabled={resultsData?.soundCode.length === 0}
            onPress={playSound}
          >
            {isPlaying ? (
              <SoundSolid color="blue" />
            ) : (
              <SoundIcon
                color={
                  resultsData?.soundCode.length > 0
                    ? isPlaying
                      ? theme.colors.red
                      : theme.colors.textLight
                    : theme.colors.gray
                }
              />
            )}
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
        {/* Content  */}
        {/* TODO make it FlatList */}
        {/* Anlamlar  */}
        {selectedTab === tabs[0].id && (
          <View style={{ marginTop: 32, flex: 1 }}>
            {(resultsData.data?.anlamlar ?? [1, 2, 3]).map((item) => (
              <DetailCard
                key={item?.id ?? item}
                data={typeof item === 'number' ? undefined : item}
                border={item.anlam_sira ?? item !== '1'}
              />
            ))}
          </View>
        )}
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
