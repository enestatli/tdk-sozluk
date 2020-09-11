import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Placeholder } from './shared'
import theme from '../utils/theme'

const FeedCard = ({ data, onPress, title, ...props }) => {
  return (
    <View {...props}>
      <Text style={styles.title}>{title}</Text>
      {/* Card */}
      <Card onPress={onPress} disabled={data ? false : true}>
        <>
          <Placeholder autoRun visible={data ? true : false}>
            <Card.Title>{data?.madde}</Card.Title>
          </Placeholder>
          <Placeholder
            extraPlaceholderStlyes={styles.summaryPlaceholder}
            autoRun
            visible={data ? true : false}
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
