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

  modalSubheaderContainer: {
    paddingTop: 40,
    paddingBottom: 40
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
  }
})

export default styles
