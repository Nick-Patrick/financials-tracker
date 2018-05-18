import { StyleSheet } from 'react-native'
import { COLOR } from 'react-native-material-ui'

const styles = StyleSheet.create({
  modalContainer: { backgroundColor: COLOR.white },

  headerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: COLOR.grey600
  },
  
  headerText: {
    fontSize: 18, 
    color: COLOR.white
  },

  buttonContainer: {
    padding: 40,
    paddingTop: 20,
    marginBottom: 0
  },
  
  buttonText: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
  },

  assetsButtonText: { 
    borderColor: COLOR.teal500,
    color: COLOR.teal500
  },

  liabilitiesButtonText: { 
    borderColor: COLOR.red400,
    color: COLOR.red400
  },

  assetsBackground: { backgroundColor: COLOR.teal900 },
  
  liabilitiesBackground: { backgroundColor: COLOR.red700 },
  
  labelText: {
    fontSize: 20,
    paddingTop: 10
  },

  textInput: { fontSize: 22 },

  accountNameContainer: { paddingTop: 20 },

  accountNameInput: { fontSize: 24 },
})

export default styles