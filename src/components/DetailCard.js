import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import theme from '../utils/theme'

import { Placeholder } from './shared'

const DetailCard = ({ data, border, dType }) => {
  console.log(dType)
  return (
    <View style={styles.container}>
      {/* Border  */}
      {border && <View style={styles.borderTop} />}
      {/* Body  */}
      <View>
        {dType !== 'atasozu' && (
          <View style={styles.textContainer}>
            <Text style={styles.anlamSiraText}>{data?.anlam_sira}</Text>
            <Placeholder
              autoRun
              visible={data ? true : false}
              width={100}
              height={12}
              shimmerStyle={{ marginLeft: 6 }}
            />
            <Text style={styles.ozellikText}>
              {data?.ozellik?.toUpperCase()}
            </Text>
          </View>
        )}

        {/* Summary */}
        <View style={{ marginTop: dType !== 'atasozu' ? 8 : 0 }}>
          <Placeholder
            autoRun
            visible={data ? true : false}
            width={240}
            height={16}
          >
            <Text style={styles.summaryText}>{data?.anlam}</Text>
          </Placeholder>

          <Placeholder
            autoRun
            visible={data ? true : false}
            width={160}
            height={16}
            shimmerStyle={{ marginTop: 4 }}
          >
            {data?.ornek.map((ornek) => (
              <View key={ornek.id}>
                <Text style={styles.ornekText}>
                  "{ornek.ornek}"{'  '}
                  <Text style={styles.ornekYazarText}>{ornek.yazar}</Text>
                </Text>
              </View>
            ))}
          </Placeholder>
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
    paddingVertical: 20,
    borderRadius: theme.radii.normal
  },
  textContainer: {
    flexDirection: 'row'
  },
  anlamSiraText: {
    marginRight: 8,
    marginLeft: -14,
    color: theme.colors.textLight
  },
  ozellikText: {
    color: theme.colors.red,
    fontStyle: 'italic',
    fontWeight: 'normal'
  },
  summaryContainer: {
    marginTop: 8
  },
  summaryText: {
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
