import React, { useContext, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native'

import theme from '../utils/theme'
import SimpleList from '../components/SimpleList'
import HeaderNavigation from '../components/HeaderNavigation'

import { HistoryTestLogo, Trash } from '../components/icons'
import { Button } from '../components/shared'
import { historyContext } from '../context'

const HistoryView = ({ navigation }) => {
  const history = useContext(historyContext)

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.softRed)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  )

  return (
    <View style={styles.container}>
      <HeaderNavigation
        children={'Geçmiş'}
        onPress={() => navigation.navigate('Search')}
      />
      <View style={styles.secondContainer}>
        {history.history.length > 0 ? (
          <View style={styles.thirdContainer}>
            <SimpleList
              ListFooterComponent={() => (
                <View style={styles.simpleListContainer}>
                  <Button
                    extraStyles={styles.button}
                    onPress={() => history.clearHistory()}
                  >
                    <View style={styles.iconFrame}>
                      <Trash style={styles.icon} />
                    </View>
                    <Text style={styles.buttonText}>Geçmişi Temizle</Text>
                  </Button>
                </View>
              )}
              hasHeader={false}
              chevron={true}
              onPress={(k) => navigation.navigate('Details', { keyword: k })}
              data={history.history}
            />
          </View>
        ) : (
          <View style={styles.rotateIconContainer}>
            <HistoryTestLogo style={styles.rotateIcon} />
            <Text style={styles.emptyHistoryText}>Henüz gemiş yok</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default HistoryView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.softRed
  },
  secondContainer: {
    flex: 1
  },
  thirdContainer: {
    flex: 1,

    paddingBottom: 20
  },
  simpleListContainer: {
    paddingVertical: 30,
    marginBottom: 20
  },
  button: {
    height: 48,
    backgroundColor: theme.colors.red,
    borderRadius: 6
  },
  iconFrame: {
    padding: 2
  },
  icon: {
    color: 'white',
    width: 18,
    height: 21
  },
  buttonText: {
    marginLeft: 6,
    color: 'white',
    fontWeight: 'bold'
  },
  rotateIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rotateIcon: {
    color: theme.colors.textLight,
    height: 48,
    width: 48
  },
  emptyHistoryText: {
    marginTop: 24,
    fontWeight: 'bold',
    color: theme.colors.textMedium
  }
})
