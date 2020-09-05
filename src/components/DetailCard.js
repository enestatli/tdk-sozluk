import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card, Placeholder } from './shared'

const DetailCard = ({ data, border }) => {
  console.log(data)

  return (
    <View>
      <Card>
        <Text>{data?.tam_adi}</Text>
        <Card.Summary>{data?.anlam}</Card.Summary>
        {data?.orneklerListe?.map((ornek) => (
          <View key={ornek.ornek_id}>
            <Card.Summary>{ornek.ornek}</Card.Summary>
          </View>
        ))}
      </Card>
    </View>

    // <View>
    //   <View>
    //     <View style={styles.container}>
    //       <>
    //         <Text>tam_adi</Text>
    //         <Card>
    //           <View style={border && styles.borderTop} />
    //           <Card.Summary>anlam</Card.Summary>
    //           <Card.Summary>summary</Card.Summary>
    //         </Card>
    //       </>
    //     </View>
    //   </View>
    // </View>
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
