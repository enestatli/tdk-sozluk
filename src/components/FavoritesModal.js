import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { favoriteContext } from '../context'
import { Button } from './shared'
import { Trash } from './icons'
import theme from '../utils/theme'

const FavoritesModal = ({ bool }) => {
  const favorites = useContext(favoriteContext)

  return (
    <View style={styles.bottomView}>
      <View style={styles.container}>
        <View style={styles.secondContainer}>
          <View style={styles.thirdContainer}>
            <Button
              disabled={favorites.selectedList.length === 0}
              extraStyles={[
                styles.trashButton,
                favorites.selectedList.length === 0
                  ? theme.colors.light
                  : theme.colors.red
              ]}
              onPress={() => favorites.removeSelected()}
            >
              <View style={styles.buttonFrame}>
                <Trash
                  style={[
                    styles.trash,
                    favorites.selectedList.length === 0
                      ? theme.colors.textLight
                      : 'red'
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.buttonText,
                  favorites.selectedList.length === 0 && {
                    color: theme.colors.textLight
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
                  ? 'Secimi Temizle'
                  : 'Tumunu Sec'}
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
              <Text style={styles.cancelText}>Vazgec</Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
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
    width: '100%',
    borderRadius: theme.radii.normal,
    backgroundColor: theme.colors.light,
    marginTop: 12
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
