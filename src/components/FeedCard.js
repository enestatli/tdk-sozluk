import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { moderateScale, scale, verticalScale } from '../utils/dimensions'

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
        width={moderateScale(100)}
        height={verticalScale(16)}
      >
        <>
          <Placeholder
            autoRun
            visible={data ? true : false}
            width={moderateScale(100)}
            height={verticalScale(16)}
          >
            <Card.Title>{data?.madde}</Card.Title>
          </Placeholder>
          <Placeholder
            extraPlaceholderStlyes={styles.summaryPlaceholder}
            autoRun
            visible={data ? true : false}
            width={moderateScale(240)}
            height={verticalScale(16)}
            shimmerStyle={{ marginTop: scale(10) }}
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
  title: {
    color: theme.colors.textLight
  }
})
