import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native'
import { Card, Placeholder } from './shared'

const DetailCard = ({ data, border }) => {
  // console.log(data[0]?.anlamlarListe)

  return (
    <View>
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              {item.anlamlarListe.map((i) => (
                <View style={styles.container}>
                  <>
                    {i.ozelliklerListe && (
                      <Text>{i.ozelliklerListe[0]?.tam_adi}</Text>
                    )}
                    <Card>
                      <View style={border && styles.borderTop} />
                      <Card.Summary>{i.anlam}</Card.Summary>
                      {i.orneklerListe && (
                        <Card.Summary>{i.orneklerListe[0]?.ornek}</Card.Summary>
                      )}
                    </Card>
                  </>
                </View>
              ))}
            </View>
          )}
        />
      )}
    </View>
  )
}

export default DetailCard

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  summaryPlaceholder: {
    marginTop: 16,
    width: 240
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
