import { StyleSheet } from 'react-native'
import { COLOR } from 'react-native-material-ui'

const styles = StyleSheet.create({
  modalContainer: { backgroundColor: COLOR.white },

  headerContainer: {
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: COLOR.grey600
  },
  
  headerText: {
    textAlign: 'center', 
    fontSize: 22, 
    color: COLOR.white
  },

  buttonContainer: {
    padding: 40,
    margin: 20
  },
  
  buttonText: {
    padding: 10,
    fontSize: 24,
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

  assetsBackground: { backgroundColor: COLOR.teal800 },
  
  liabilitiesBackground: { backgroundColor: COLOR.red600 },
  
  labelText: {
    fontSize: 20,
    paddingTop: 10
  }
})

export default styles