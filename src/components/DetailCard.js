import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Placeholder } from './shared'
import theme from '../utils/theme'

const DetailCard = ({ data, border, children, ...props }) => {
  return (
    <View style={styles.container} {...props}>
      {/* Border  */}
      {border && <View style={styles.borderTop} />}
      {/* Body  */}
      <View>
        <Placeholder
          autoRun
          visible={data ? true : false}
          width={100}
          height={16}
        >
          <View style={styles.textContainer}>
            <Text style={styles.anlamSiraText}>{data?.anlam_sira}</Text>
            <Text style={styles.ozellikText}>{data?.ozellik}</Text>
          </View>
        </Placeholder>
        {/* Summary */}

        <View style={styles.summaryContainer}>
          <Placeholder
            autoRun
            visible={data ? true : false}
            width={240}
            height={16}
          >
            <Text fontWeight="600">{data?.anlam}</Text>
          </Placeholder>
          <View style={styles.summaryContainerPlaceholder}>
            <Placeholder
              autoRun
              visible={data ? true : false}
              width={160}
              height={16}
            >
              {data?.ornek.map((ornek) => (
                <View key={ornek.id}>
                  <Text style={styles.ornekText}>
                    {ornek.ornek}{' '}
                    <Text style={styles.ornekYazarText}>{ornek.yazar}</Text>
                  </Text>
                </View>
              ))}
            </Placeholder>
          </View>
        </View>
      </View>
    </View>
  )
}

export default DetailCard

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: 'white',
    paddingHorizontal: 28,
    paddingVertical: 20
  },
  textContainer: {
    flexDirection: 'row'
  },
  anlamSiraText: {
    marginRight: 8, //TODO add marginLeft: -10
    color: theme.colors.textLight //TODO
  },
  ozellikText: {
    color: theme.colors.red
  },
  summaryContainer: {
    marginTop: 8
  },
  summaryContainerPlaceholder: {
    marginTop: 8
  },
  anlamText: {
    fontWeight: 'bold',
    color: theme.colors.textDark
  },
  ornekText: {
    marginLeft: 10,
    marginTop: 12,
    color: theme.colors.textLight,
    fontWeight: '500'
  },
  ornekYazarText: {
    fontWeight: '700',
    color: theme.colors.textLight
  },
  borderTop: {
    position: 'absolute',
    top: 0,
    left: 12,
    right: 12,
    height: 1,
    backgroundColor: theme.colors.light
  }
})
