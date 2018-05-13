import { StyleSheet } from 'react-native'
import { COLOR } from 'react-native-material-ui'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.white
  },

  contentContainer: {
    flex: 1
  },

  addAccountButtonContainer: {
    height: 80
  },

  assetPrimaryColor: {
    backgroundColor: COLOR.teal400
  },

  liabilityPrimaryColor: {
    backgroundColor: COLOR.red500
  },
  
  addAccountButtonText: {
    fontSize: 20
  },

  labelText: {
    fontSize: 20
  },

  textInput: {
    fontSize: 30
  }
})

export default styles