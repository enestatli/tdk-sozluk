import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { favoriteContext } from '../context'
import { Button } from './shared'
import { Trash } from './icons'
import theme from '../utils/theme'

const FavoritesModal = () => {
  const favorites = useContext(favoriteContext)

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.thirdContainer}>
          <Button
            disabled={favorites.selectedList.length === 0}
            extraStyles={{
              ...styles.trashButton,
              backgroundColor:
                favorites.selectedList.length === 0
                  ? theme.colors.light
                  : theme.colors.red
            }}
            onPress={() => favorites.removeSelected()}
          >
            <View style={styles.buttonFrame}>
              <Trash
                style={{
                  ...styles.trash,
                  color:
                    favorites.selectedList.length === 0
                      ? theme.colors.textMedium
                      : 'white'
                }}
              />
            </View>
            <Text
              style={[
                styles.buttonText,
                favorites.selectedList.length === 0 && {
                  color: theme.colors.textMedium
                }
              ]}
            >{`Sil (${favorites.selectedList.length})`}</Text>
          </Button>
          <Button
            onPress={() =>
              favorites.updateSelectedList(
                favorites.selectedList.length === favorites.favorites.length
                  ? []
                  : favorites.favorites
              )
            }
            extraStyles={styles.selectAllButton}
          >
            <Text style={styles.selectAlButtonText}>
              {favorites.selectedList.length === favorites.favorites.length
                ? 'Seçimi Temizle'
                : 'Tümünü Seç'}
            </Text>
          </Button>
        </View>
        <View style={styles.cancelButtonContainer}>
          <Button
            onPress={() => {
              favorites.setSelectable(false)
            }}
            extraStyles={styles.cancelButton}
          >
            <Text style={styles.cancelText}>Vazgeç</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    //TODO eval for android
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: -2
    }
  },
  secondContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 48
  },
  thirdContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  trashButton: {
    height: 48,
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: theme.colors.red,
    borderRadius: theme.radii.normal
  },
  buttonFrame: {
    paddingBottom: 2
  },
  buttonText: {
    marginLeft: 6,
    color: 'white',
    fontWeight: 'bold'
  },
  selectAllButton: {
    marginHorizontal: 8,
    borderRadius: theme.radii.normal,
    height: 48,
    backgroundColor: theme.colors.light,
    flex: 1
  },
  selectAlButtonText: {
    fontWeight: 'bold',
    color: theme.colors.textMedium
  },
  cancelButtonContainer: {
    width: '100%'
  },
  cancelButton: {
    marginTop: 16,
    height: 48,
    width: '100%'
  },
  cancelText: {
    fontWeight: 'bold',
    color: theme.colors.textLight
  },
  trash: {
    color: 'white',
    width: 18,
    height: 12
  }
})

export default FavoritesModal
