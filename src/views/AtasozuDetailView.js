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

import { Favorite, Hand, FavoriteSolid } from '../components/icons'
import { resultsContext, historyContext, favoriteContext } from '../context'
import throttle from 'lodash.throttle'

const AtasozuDetailView = ({ route, navigation }) => {
  const keyword = route.params?.keyword
  console.log(keyword)
  const resultsData = useContext(resultsContext)
  const history = useContext(historyContext)
  const favorites = useContext(favoriteContext)
  const isFavorited = favorites.favorites.find((f) => f.title === keyword)

  useEffect(() => {
    history.addToHistory(keyword)
    // resultsData.getResults(keyword) //TODO!!!!!!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.atasozleriLight)
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
        backgroundColor: theme.colors.atasozleriLight
      }}
    >
      <ScrollView style={styles.secondContainer}>
        {/* Keyword, lisan*/}
        <View>
          <Text style={styles.keywordText}>{keyword}</Text>
          <Text style={styles.telaffuzText}>Atasözleri ve Deyimler</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtonsFrame}>
          <ActionButton
            extraStyles={styles.favoriteButton}
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
            extraStyles={styles.handButton}
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
      </ScrollView>
    </View>
  )
}

export default AtasozuDetailView

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
