import React, { useContext, useState } from 'react'
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'

import { favoriteContext } from '../context'
import { Button } from './shared'
import { Trash } from './icons'
import theme from '../utils/theme'

const FavoritesModal = ({ bool }) => {
  const favorites = useContext(favoriteContext)
  const [modalVisible, setModalVisible] = useState(bool)

  return (
    // <View style={styles.centeredView}>
    //   <Modal
    //     animationType="slide"
    //     transparent={true}
    //     visible={modalVisible}
    //     onRequestClose={() => {
    //       Alert.alert('Modal has been closed.')
    //     }}
    //   >
    //     <View style={styles.centeredView}>
    //       <View style={styles.modalView}>
    //         <Text style={styles.modalText}>Hello World!</Text>

    //         <TouchableHighlight
    //           style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
    //           onPress={() => {
    //             setModalVisible(!modalVisible)
    //           }}
    //         >
    //           <Text style={styles.textStyle}>Hide Modal</Text>
    //         </TouchableHighlight>
    //       </View>
    //     </View>
    //   </Modal>
    // </View>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.')
      }}
    >
      <View style={styles.bottomView}>
        <View style={styles.modalView}>
          <View style={styles.container}>
            <View style={styles.secondContainer}>
              <View style={styles.thirdContainer}>
                <Button extraStyles={styles.trashButton}>
                  <View style={styles.buttonFrame}>
                    <Trash style={styles.trash} />
                  </View>
                  <Text style={styles.buttonText}>{`Sil ${bool}`}</Text>
                </Button>
                <Button extraStyles={styles.selectAllButton}>
                  <Text style={styles.selectAlButtonText}>
                    {bool && 'Secimi Temizle'}
                  </Text>
                </Button>
              </View>
              <View style={styles.cancelButtonContainer}>
                <Button extraStyles={styles.cancelButton}>
                  <Text>Vazgec</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  bottomView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 120
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  container: {
    height: '40%',
    borderColor: 'red',
    borderWidth: 1
  },
  secondContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 48
  },
  thirdContainer: {
    width: '100%',
    flexDirection: 'row'
  },
  trashButton: {
    height: 48,
    flex: 1,
    marginHorizontal: 8,
    backgroundColor: theme.colors.red,
    borderRadius: theme.radii.normal
  },
  buttonFrame: {
    paddingBottom: 2
  },
  buttonText: {
    marginLeft: 6,
    color: 'white',
    fontWeight: 'bold'
  },
  selectAllButton: {
    marginHorizontal: 8,
    borderRadius: theme.radii.normal,
    height: 48,
    backgroundColor: theme.colors.light,
    flex: 1
  },
  selectAlButtonText: {
    fontWeight: 'bold',
    color: theme.colors.textMedium
  },
  cancelButtonContainer: {
    width: '100%',
    borderRadius: theme.radii.normal,
    backgroundColor: theme.colors.light,
    marginTop: 12
  },
  cancelButton: {
    marginTop: 16,
    height: 48,
    width: '100%'
  },
  trash: {
    color: 'white',
    width: 18,
    height: 12
  }
})

// const styles = StyleSheet.create({
//   centeredView: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: 100
//   },
//   modalView: {
//     margin: 20,
//     backgroundColor: 'white',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5
//   },
//   openButton: {
//     backgroundColor: '#F194FF',
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   textStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center'
//   },
//   modalText: {
//     marginBottom: 15,
//     textAlign: 'center'
//   }
// })

export default FavoritesModal
