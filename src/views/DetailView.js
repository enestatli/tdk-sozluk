import React, { useCallback, useState, useEffect } from 'react'
import { View, Text, StatusBar, Platform, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import theme from '../utils/theme'
import FeedCard from '../components/FeedCard'
import ActionButton from '../components/ActionButton'

import { Sound, Favorite, Hand } from '../components/icons'
import DetailCard from '../components/DetailCard'

const DetailView = ({ route, navigation }) => {
  const [detailData, setDetailData] = useState(null)
  // const keyword = route.params.keyword
  const keyword = 'gelmek'

  const getDetailData = async (keyword) => {
    const response = await fetch(`https://sozluk.gov.tr/gts?ara=${keyword}`)
    const data = await response.json()
    setDetailData(data)
  }

  useEffect(() => {
    getDetailData(keyword)
  }, [keyword])

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content')
      Platform.OS === 'android' &&
        StatusBar.setBackgroundColor(theme.colors.softRed)
    }, [])
  )
  return (
    <View style={styles.container}>
      <View>
        <Text>Title</Text>
        <Text>Keyword</Text>
        <View>
          <View style={styles.actionButtonsFrame}>
            <ActionButton>
              <Sound color="red" />
            </ActionButton>
            <ActionButton>
              <Favorite color="red" />
            </ActionButton>
            <ActionButton>
              <Hand color="red" />
              <ActionButton.Title>Title</ActionButton.Title>
            </ActionButton>
          </View>
          <View>
            <DetailCard data={detailData !== null && detailData} />
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
  }
})
