import React from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import SimpleCard from './SimpleCard'
import theme from '../utils/theme'

import { Right, Check, Circle } from './icons'

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
            extraCardStyles={{
              paddingVertical:
                selectable && selectedList.includes(item) ? 15 : 16,
              ...(selectedList.includes(item) ? styles.simpleCardBorder : {})
            }}
          >
            <SimpleCard.Title style={styles.title}>
              {item.title}
            </SimpleCard.Title>

            {selectable ? (
              selectedList.includes(item) ? (
                <Check
                  style={styles.circleCheckIcon}
                  color={theme.colors.red}
                />
              ) : (
                <Circle style={styles.circleIcon} color={theme.colors.red} />
              )
            ) : (
              chevron && <Right style={styles.rightIcon} />
            )}
          </SimpleCard>
        </View>
      )}
      ListFooterComponent={<View style={{ height: selectable ? 180 : 40 }} />}
      ListHeaderComponent={
        hasHeader ? (
          <View>
            <Text style={styles.headerText}>Son Aramalar</Text>
          </View>
        ) : (
          () => <></>
        )
      }
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
    paddingRight: 32,
    fontWeight: 'bold',
    fontSize: 16
  },
  circleCheckIcon: {
    marginLeft: 'auto',
    color: 'white'
  },
  circleIcon: {
    marginLeft: 'auto',
    color: 'white'
  },
  rightIcon: {
    marginLeft: 'auto',
    height: 18,
    width: 18,
    color: theme.colors.red
  },
  headerText: {
    color: theme.colors.textLight,
    marginBottom: 10
  },
  simpleCardBorder: {
    borderWidth: 1,
    borderColor: '#F3A5B1',
    shadowColor: theme.colors.red,
    shadowOpacity: 0.16,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 3
  }
})
