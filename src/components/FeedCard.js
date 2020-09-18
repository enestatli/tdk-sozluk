import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import theme from '../utils/theme'

import { Card, Placeholder } from './shared'

const FeedCard = ({ data, onPress, title, ...props }) => {
  return (
    <View {...props}>
      <Text style={styles.title}>{title}</Text>
      {/* Card */}
      <Card
        onPress={onPress}
        disabled={data ? false : true}
        width={100}
        height={16}
      >
        <>
          <Placeholder
            autoRun
            visible={data ? true : false}
            width={100}
            height={16}
          >
            <Card.Title>{data?.madde}</Card.Title>
          </Placeholder>
          <Placeholder
            extraPlaceholderStlyes={styles.summaryPlaceholder}
            autoRun
            visible={data ? true : false}
            width={240}
            height={16}
            shimmerStyle={{ marginTop: 10 }}
          >
            <Card.Summary>{data?.anlam}</Card.Summary>
          </Placeholder>
        </>
      </Card>
    </View>
  )
}

export default FeedCard

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  title: {
    color: theme.colors.textLight
  }
})
