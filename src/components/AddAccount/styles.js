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
  },

  modalContainer: {
    backgroundColor: COLOR.white
  },

  modalHeaderContainer: {
    paddingTop: 40,
    paddingBottom: 40
  },

  modalHeaderContainerAssets: {
    backgroundColor: COLOR.teal500,    
  },

  modalHeaderContainerLiabilities: {
    backgroundColor: COLOR.red400,    
  },

  modalHeaderText: {
    textAlign: 'center', 
    fontSize: 22, 
    color: COLOR.white 
  },

  submitButtonContainer: {
    padding: 40,
    margin: 20
  },

  submitButtonText: {
    padding: 10,
    fontSize: 24,
    borderBottomWidth: 1,
  },

  submitButtonTextAssets: {
    borderColor: COLOR.teal500,
    color: COLOR.teal500
  },

  submitButtonTextLiabilities: {
    borderColor: COLOR.red400,
    color: COLOR.red400
  }
})

export default styles