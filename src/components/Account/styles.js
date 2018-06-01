import { StyleSheet } from 'react-native'
import { COLOR } from 'react-native-material-ui'

const styles = StyleSheet.create({
  labelText: {
    fontSize: 20,
    paddingTop: 10
  },

  textInput: {
    fontSize: 22
  },

  accountNameInput: {
    fontSize: 24
  },

  accountNameContainer: {
    paddingTop: 20
  },

  modalSubheaderContainer: {
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: COLOR.grey600
  },

  currencyModalHeaderContainer: {
    backgroundColor: COLOR.white,
    paddingTop: 30,
    paddingBottom: 20
  },

  currencyModalHeaderText: {
    color: COLOR.grey700
  },

  currencyButtonContainer: {
    height: 80
  },

  currencyButtonText: {
    color: COLOR.grey600,
    padding: 10,
    borderColor: COLOR.grey600,
    borderBottomWidth: 1,
    fontSize: 20
  },

  modalSubheaderContainerAssets: {
    backgroundColor: COLOR.teal500
  },

  modalSubheaderContainerLiabilities: {
    backgroundColor: COLOR.red400
  },

  modalSubheaderText: {
    textAlign: 'center', 
    fontSize: 22, 
    color: COLOR.white
  },

  updateAccountContainer: {
    paddingTop: 20, 
    paddingBottom: 10
  },

  updateAccountButtonContainer: {
    padding: 30, 
    paddingLeft: 40, 
    paddingRight: 40
  },

  updateAccountButtonAssets: {
    backgroundColor: COLOR.teal500
  },

  updateAccountButtonLiabilities: {
    backgroundColor: COLOR.red500
  },

  updateAccountButtonText: {
    fontSize: 20,
    color: COLOR.white
  }
})

export default styles
