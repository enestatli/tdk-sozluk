import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import { Right, CircleCheck } from './icons'
import { Circle } from 'react-native-svg'

import SimpleCard from './SimpleCard'
import theme from '../utils/theme'

const SimpleList = ({
  data,
  hasHeader = true,
  chevron = false,
  onPress = () => {},
  selectable = false,
  selectedList = [],
  onSelect = () => {},
  onLongPress = () => {},
  ...props
}) => {
  return (
    <FlatList
      style={styles.flatList}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <SimpleCard
            onLongPress={onLongPress}
            onPress={() => {
              selectable ? onSelect(item) : onPress(item.title)
            }}
            extraCardStyles={styles.cardContainer}
          >
            <SimpleCard.Title style={styles.title}>
              {item.title}
            </SimpleCard.Title>

            {selectable ? (
              selectedList.includes(item) ? (
                <CircleCheck style={styles.circleCheckIcon} />
              ) : (
                <Circle style={styles.circleIcon} />
              )
            ) : (
              chevron && <Right style={styles.rightIcon} />
            )}
          </SimpleCard>
        </View>
      )}
      ListFooterComponent={
        <View style={[styles.footer, selectable && { height: 180 }]} />
      }
      ListHeaderComponent={hasHeader ? <Text>Son Aramalar</Text> : () => <></>}
      {...props}
    />
  )
}

export default SimpleList

const styles = StyleSheet.create({
  flatList: {
    padding: 16,
    paddingTop: 24
  },
  card: {
    paddingVertical: 6
  },

  cardContainer: {
    paddingVertical: 16
  },
  title: {
    //TODO paddinRight !chevron ? 0: 32
    paddingRight: 32,
    fontWeight: 'bold',
    fontSize: 16
  },
  circleCheckIcon: {
    marginLeft: 'auto',
    height: 18,
    width: 18,
    color: theme.colors.red
  },
  circleIcon: {
    marginLeft: 'auto',
    height: 18,
    width: 18,
    color: theme.colors.red
  },
  rightIcon: {
    marginLeft: 'auto',
    height: 18,
    width: 18,
    color: theme.colors.red
  },
  footer: {
    height: 20
  }
})
