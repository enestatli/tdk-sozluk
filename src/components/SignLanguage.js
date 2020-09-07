import React from 'react'
import { StyleSheet, Text, View, FlatList, Image } from 'react-native'
import theme from '../utils/theme'

const letters = 'abcçdefgğhıijklmnoöprsştuüvyz'
const imgUrl = (letter) =>
  `https://sozluk.gov.tr/assets/img/isaret/${letter}.gif`

const fixLetter = (letter) => {
  const specials = [
    { r: 'â', l: 'a' },
    { r: 'î', l: 'i' },
    { r: 'û', l: 'ü' }
  ]
  let l = letter
  const specialIndex = specials.find((s) => s.r === l)
  if (specialIndex) {
    l = specialIndex.l
  }
  return l
}

const fixKeyword = (keyword) => keyword.split('').map((l) => fixLetter(l))
const hasGif = (letter) => letters.includes(letter)

const SignLanguage = ({ keyword }) => {
  const fixed = fixKeyword(keyword)

  return (
    <View style={styles.container}>
      <View style={styles.secondContainer}>
        <View style={styles.box}>
          <View style={styles.secondBox} />
        </View>
        <View>
          <Text>Turk Isaret Dili</Text>
          <Text>Parmak Alfabesiyle Gosterilisi</Text>
        </View>
        <View style={styles.flatList}>
          <FlatList
            horizontal={true}
            data={fixed.map((el, i) => ({ letter: el, id: i + '_' + el }))}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View stlye={{ width: 10 }} />}
            renderItem={({ item }) => {
              return (
                <View>
                  <View>
                    {hasGif(item.letter) ? (
                      <View style={styles.gif}>
                        <Image
                          style={{ height: 44, width: 123 / 2 }}
                          source={{ uri: imgUrl(item.letter) }}
                        />
                      </View>
                    ) : (
                      <View style={styles.noGif} />
                    )}
                  </View>
                  <View style={styles.letterContainer}>
                    <Text>{item.letter}</Text>
                  </View>
                </View>
              )
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default SignLanguage

const styles = StyleSheet.create({
  container: {
    height: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: -2
    }
  },
  secondContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    marginTop: 20,
    borderRadius: 15,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 48
  },
  box: {
    width: '100%'
  },
  secondBox: {
    height: 4,
    width: 58,
    borderRadius: 14,
    backgroundColor: theme.colors.light,
    marginHorizontal: 'auto',
    marginBottom: 16
  },
  flatList: {
    width: '100%',
    flex: 1,
    marginTop: 32
  },
  gif: {
    height: 64,
    width: 102,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.softRed
  },
  noGif: {
    height: 64,
    width: 44,
    backgroundColor: 'white'
  },
  letterContainer: {
    backgroundColor: theme.colors.softRed,
    marginTop: 6,
    borderRadius: 3,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
