import { StyleSheet } from 'react-native'
import { COLOR } from 'react-native-material-ui'

const styles = StyleSheet.create({
  container: {
    height: 100, 
    flexDirection: 'row',
    alignSelf: 'stretch',
    padding: 10
  },
  assetsBackground: {
    backgroundColor: COLOR.teal800
  },
  liabilitiesBackground: {
    backgroundColor: COLOR.red600
  },
})

export default styles