import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Placeholder } from './shared'
import theme from '../utils/theme'

const DetailCard = ({ data, border, children, ...props }) => {
  return (
    <View style={styles.container}>
      {/* Border  */}
      {border && <View style={styles.borderTop} />}
      {/* Body  */}
      <View>
        <Placeholder
          autoRun
          visible={data ? true : false}
          extraPlaceholderStyle={styles.bodyPlaceholder}
        >
          <View style={styles.textContainer}>
            <Text style={styles.anlamSiraText}>{data?.anlam_sira + ' '}</Text>
            <Text style={styles.ozellikText}>{data?.ozellik}</Text>
          </View>
        </Placeholder>
        {/* Summary */}

        <View mt={8}>
          <Placeholder autoRun visible={data ? true : false} width={240}>
            <Text fontWeight="600">{data?.anlam}</Text>
          </Placeholder>
          <Placeholder autoRun visible={data ? true : false} width={160} mt={4}>
            {data?.ornek.map((ornek) => (
              <View key={ornek.id}>
                <Text ml={10} mt={12} color="textLight" fontWeight="500">
                  {ornek.ornek}{' '}
                  <Text fontWeight="700" color="textLight">
                    {ornek.yazar}
                  </Text>
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
    paddingVertical: 20
  },
  bodyPlaceholder: {
    width: 100
  },
  textContainer: {
    flexDirection: 'row'
  },
  anlamSiraText: {
    marginLeft: -14,
    marginRight: 8,
    color: theme.colors.textLight
  },
  ozellikText: {
    color: theme.colors.red
  },
  summaryContainer: {
    marginTop: 8
  },
  anlamPlaceholder: {
    width: 240
  },
  anlamText: {
    fontWeight: 'bold',
    color: theme.colors.textDark
  },
  orneklerPlaceholder: {
    width: 160,
    marginTop: 4
  },
  ornekText: {
    marginLeft: 10,
    marginTop: 12,
    color: 'blue',
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
    backgroundColor: 'black'
  }
})
