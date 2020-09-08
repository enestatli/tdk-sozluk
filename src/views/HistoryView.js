import React, { useContext } from 'react'

import { View, Text } from 'react-native'
import { Left, RotateCcw } from '../components/icons'
import { Button } from '../components/shared'

import SimpleList from '../components/SimpleList'
import { historyContext } from '../context'

const HistoryView = ({ navigation }) => {
  const history = useContext(historyContext)

  return (
    <View>
      <View>
        <Button>
          <Left color="blue" />
          <Text>Gecmis</Text>
        </Button>
      </View>
      <View>
        {history.history.length > 0 ? (
          <SimpleList
            hasHeader={false}
            chevron={true}
            onPress={(k) => navigation.navigate('Details', { keyword: k })}
            data={history.history}
          />
        ) : (
          <View>
            <RotateCcw color="blue" />
            <Text>Henuz gecmis yok.</Text>
          </View>
        )}
      </View>
    </View>
  )
}

export default HistoryView
