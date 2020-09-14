import React, { useCallback, useEffect, useContext, useState } from 'react'
import {
  View,
  Text,
  StatusBar,
  Platform,
  StyleSheet,
  ScrollView,
  ToastAndroid
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
  FavoriteSolid,
  Right
} from '../components/icons'
import { resultsContext, historyContext, favoriteContext } from '../context'
import throttle from 'lodash.throttle'
import DetailFocusBar from '../components/DetailFocusBar'
import SimpleCard from '../components/SimpleCard'

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
  // console.log(route?.params)

  const playSound = throttle(() => {
    ToastAndroid.showWithGravityAndOffset(
      'Şu an sesli dinliyorsunuz',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      0,
      385
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

  useEffect(() => {
    history.addToHistory(keyword)
    // resultsData.getResults(keyword) //TODO!!!!!!
    setSelectedTab(tabs[0].id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(
          route.params?.tabs === 'atasozu'
            ? theme.colors.atasozleriLight
            : route.params?.tabs === 'birlesikler'
            ? theme.colors.birlesikKelimeLight
            : theme.colors.softRed
        )
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
    <View
      style={{
        ...styles.container,
        backgroundColor:
          route.params?.tabs === 'atasozu'
            ? theme.colors.atasozleriLight
            : route.params?.tabs === 'birlesikler'
            ? theme.colors.birlesikKelimeLight
            : theme.colors.softRed
      }}
    >
      {/* Focus Bar */}
      {route.params?.tabs !== 'atasozu' &&
        route.params?.tabs !== 'birlesikler' && (
          <DetailFocusBar
            onPress={(id) => setSelectedTab(id)}
            tabs={tabs}
            selected={selectedTab}
          />
        )}

      <ScrollView style={styles.secondContainer}>
        {/* Keyword, lisan*/}
        <View>
          <Text style={styles.keywordText}>{keyword}</Text>
          {route.params?.tabs === 'anlamlar' ? (
            <Text style={styles.telaffuzText}>
              {resultsData.data?.telaffuz
                ? resultsData.data?.telaffuz + ' '
                : ''}
              {resultsData.data?.lisan ?? ''}
            </Text>
          ) : route.params?.tabs === 'atasozu' ? (
            <Text style={styles.telaffuzText}>Atasözleri ve Deyimler</Text>
          ) : (
            <Text style={styles.telaffuzText}>Birleşik Kelimeler</Text>
          )}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsFrame}>
          {route.params?.tabs !== 'atasozu' &&
            route.params?.tabs !== 'birlesikler' && (
              <ActionButton
                disabled={resultsData?.soundCode.length === 0}
                onPress={playSound}
              >
                {isPlaying ? (
                  <SoundSolid color={theme.colors.red} />
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
            )}

          <ActionButton
            extraStyles={{
              ...styles.favoriteButton,
              marginLeft: route.params?.tabs === 'anlamlar' ? 12 : 0
            }}
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
            extraStyles={{
              ...styles.handButton,
              marginLeft: route.params?.tabs === 'anlamlar' ? 'auto' : 12
            }}
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
                tabs={route.params?.tabs}
                key={item?.id ?? item}
                data={typeof item === 'number' ? undefined : item}
                border={(item.anlam_sira ?? item) !== '1'}
              />
            ))}
          </View>
        )}
        {/* Atasozleri */}
        {selectedTab === tabs[1].id && (
          <View style={styles.atasozleriContainer}>
            {(resultsData.data?.atasozu ?? [1, 2, 3]).map((item) => (
              <View key={item.id} style={styles.atasozCardContainer}>
                <SimpleCard
                  onPress={() =>
                    navigation.navigate('Details', {
                      keyword: item.title,
                      tabs: tabs[1].id
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
            <View style={{ height: 30 }} />
          </View>
        )}
        {/* Birlesikler */}
        {selectedTab === tabs[2].id && (
          <View style={styles.atasozleriContainer}>
            {(resultsData.data?.birlesikler ?? [1, 2, 3]).map((item) => (
              <View key={item.id} style={styles.atasozCardContainer}>
                <SimpleCard
                  onPress={() =>
                    navigation.navigate('Details', {
                      keyword: item.title,
                      tabs: tabs[2].id
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
            <View style={{ height: 30 }} />
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
    padding: 16,
    backgroundColor: theme.colors.softRed
  },
  secondContainer: {
    marginTop: 0,
    padding: 16
  },
  keywordText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.textDark
  },
  telaffuzText: {
    color: theme.colors.textLight,
    marginTop: 6
  },
  actionButtonsFrame: {
    flexDirection: 'row',
    marginTop: 24
  },
  detailCards: {
    marginTop: 20
  },
  iconSize: {
    width: 24,
    height: 24
  },
  favoriteButton: {
    marginLeft: 12
  },
  handButton: {
    marginLeft: 'auto'
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
    paddingRight: 32
  },
  rightIcon: {
    marginLeft: 'auto',
    height: 18,
    width: 18,
    color: theme.colors.red
  }
})
