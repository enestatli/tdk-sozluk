import React, { useCallback, useEffect, useContext, useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Dimensions
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import Sound from 'react-native-sound'
import throttle from 'lodash.throttle'

import theme from '../utils/theme'

import ActionButton from '../components/ActionButton'
import DetailCard from '../components/DetailCard'
import DetailFocusBar from '../components/DetailFocusBar'
import SimpleCard from '../components/SimpleCard'

import {
  Sound as SoundIcon,
  SoundSolid,
  Favorite,
  Hand,
  FavoriteSolid,
  Right
} from '../components/icons'
import {
  resultsContext,
  historyContext,
  favoriteContext,
  searchContext
} from '../context'
import { getAtasozuDeyim } from '../utils/api'

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

const y = Dimensions.get('window').height / 2

const DetailView = ({ route, navigation }) => {
  const keyword = route.params?.keyword
  const resultsData = useContext(resultsContext)
  const history = useContext(historyContext)
  const favorites = useContext(favoriteContext)
  const search = useContext(searchContext)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedTab, setSelectedTab] = useState(tabs[0].id)
  const isFavorited = favorites.favorites.find((f) => f.title === keyword)

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      if (keyword) {
        const data = await getAtasozuDeyim(keyword)
        if (keyword.includes('(')) {
          search?.setLastDataType('atasozu')
        } else {
          if (data?.length === 1 || data?.length === 2) {
            if (data[0]?.sozum === keyword || data[1]?.sozum === keyword) {
              if (data[0]?.turu2 === 'Deyim' || data[0]?.turu2 === 'Atasözü') {
                search?.setLastDataType('atasozu')
              } else {
                search?.setLastDataType('')
              }
            } else {
              search?.setLastDataType('')
            }
          } else {
            search?.setLastDataType('')
          }
        }
      }
    })()
  }, [keyword])

  useEffect(() => {
    history.addToHistory(keyword)
    setSelectedTab(tabs[0].id)
  }, [keyword])

  useEffect(() => {
    StatusBar.setBarStyle('dark-content')
    Platform.OS === 'android' &&
      StatusBar.setBackgroundColor(
        search?.lastDataType !== 'atasozu'
          ? theme.colors.softRed
          : theme.colors.atasozleriLight
      )
  }, [search?.lastDataType])

  useFocusEffect(
    useCallback(() => {
      resultsData.getResults(keyword)
      return () => {
        resultsData.clearResults()
      }
    }, [keyword])
  )

  const playSound = throttle(() => {
    ToastAndroid.showWithGravityAndOffset(
      'Şu an sesli dinliyorsunuz',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      y
    )
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

  return (
    <View
      style={[
        styles.container,
        search?.lastDataType === 'atasozu' && {
          backgroundColor: theme.colors.atasozleriLight
        }
      ]}
    >
      {/* Focus Bar */}
      {search?.lastDataType !== 'atasozu' && (
        <DetailFocusBar
          onPress={(id) => setSelectedTab(id)}
          tabs={tabs}
          selected={selectedTab}
        />
      )}

      <ScrollView
        style={styles.secondContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Keyword, lisan*/}
        <View style={[styles.keywordContainer]}>
          <Text style={styles.keywordText}>{keyword}</Text>
          {search?.lastDataType !== 'atasozu' ? (
            <Text style={styles.telaffuzText}>
              {resultsData.data?.telaffuz
                ? resultsData.data?.telaffuz + ' '
                : ''}
              {resultsData.data?.lisan ?? ''}
            </Text>
          ) : (
            <Text style={styles.telaffuzText}>Atasözleri ve Deyimler</Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsFrame}>
          <ActionButton
            disabled={resultsData?.soundCode.length === 0}
            onPress={playSound}
          >
            {isPlaying ? (
              <SoundSolid style={styles.iconSize} color={theme.colors.red} />
            ) : (
              <SoundIcon
                style={styles.iconSize}
                color={
                  resultsData.soundCode.length > 0
                    ? isPlaying
                      ? theme.colors.red
                      : theme.colors.textLight
                    : theme.colors.softGray
                }
              />
            )}
          </ActionButton>

          <ActionButton
            extra={styles.favoriteButton}
            onPress={throttle(() => {
              isFavorited
                ? favorites.removeFromFavorites(keyword)
                : favorites.addToFavorites(keyword)
            }, 500)}
          >
            {isFavorited ? (
              <FavoriteSolid style={styles.iconSize} color={theme.colors.red} />
            ) : (
              <Favorite
                style={styles.iconSize}
                color={theme.colors.textLight}
              />
            )}
          </ActionButton>
          <ActionButton
            extra={styles.handButton}
            disabled={keyword ? false : true}
            onPress={throttle(() => {
              resultsData.signSheet
                ? resultsData.closeSignSheet()
                : resultsData.openSignSheet(keyword)
            }, 500)}
          >
            <Hand
              style={styles.iconSize}
              color={
                resultsData.signSheet
                  ? theme.colors.red
                  : theme.colors.textLight
              }
            />
            <ActionButton.Title
              color={
                resultsData.signSheet
                  ? theme.colors.red
                  : theme.colors.textLight
              }
            >
              Türk İşaret Dili
            </ActionButton.Title>
          </ActionButton>
        </View>
        {/* Content  */}
        {/* TODO make it FlatList */}
        {/* Anlamlar  */}
        {selectedTab === tabs[0].id && (
          <View style={styles.anlamlarContainer}>
            {(resultsData.data?.anlamlar ?? [1, 2, 3]).map((item) => (
              <DetailCard
                dType={search?.lastDataType}
                key={item?.id ?? item}
                data={typeof item === 'number' ? undefined : item}
                border={(item.anlam_sira ?? item) !== '1'}
              />
            ))}
            <View style={styles.footer} />
          </View>
        )}
        {/* Atasozleri */}
        {selectedTab === tabs[1].id && (
          <View style={styles.atasozleriContainer}>
            {(resultsData.data?.atasozu ?? [1, 2, 3]).map((item) => (
              <View key={item?.id ?? item} style={styles.atasozCardContainer}>
                <SimpleCard
                  onPress={() =>
                    navigation.navigate('Details', {
                      keyword: item.title
                    })
                  }
                >
                  <SimpleCard.Title style={styles.atasozCardTitle}>
                    {item.title}
                  </SimpleCard.Title>
                  <Right style={styles.rightIcon} />
                </SimpleCard>
              </View>
            ))}
            <View style={styles.footer} />
          </View>
        )}
        {/* Birlesikler */}
        {selectedTab === tabs[2].id && (
          <View style={styles.atasozleriContainer}>
            {(resultsData.data?.birlesikler ?? [1, 2, 3]).map((item) => (
              <View key={item?.id ?? item} style={styles.atasozCardContainer}>
                <SimpleCard
                  onPress={() =>
                    navigation.navigate('Details', {
                      keyword: item.title
                    })
                  }
                >
                  <SimpleCard.Title style={styles.atasozCardTitle}>
                    {item.title}
                  </SimpleCard.Title>
                  <Right style={styles.rightIcon} />
                </SimpleCard>
              </View>
            ))}
            <View style={styles.footer} />
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default DetailView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.softRed
  },
  secondContainer: {
    marginTop: 0,
    padding: 16
  },
  keywordContainer: {
    paddingLeft: 8
  },
  keywordText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.textDark
  },
  telaffuzText: {
    color: theme.colors.textLight,
    marginTop: 6,
    fontStyle: 'italic'
  },
  actionButtonsFrame: {
    flexDirection: 'row',
    marginTop: 24,
    marginLeft: 1
  },
  iconSize: {
    width: 24,
    height: 24
  },
  favoriteButton: {
    marginLeft: 13
  },
  handButton: {
    marginLeft: 'auto',
    marginRight: 1
  },
  anlamlarContainer: {
    marginTop: 32,
    flex: 1
  },
  atasozleriContainer: {
    marginTop: 26,
    flex: 1
  },
  atasozCardContainer: {
    paddingVertical: 6
  },
  atasozCardTitle: {
    paddingRight: 32,
    fontWeight: 'bold'
  },
  rightIcon: {
    marginLeft: 'auto',
    height: 18,
    width: 18,
    color: theme.colors.red
  },
  footer: {
    height: 40
  }
})
