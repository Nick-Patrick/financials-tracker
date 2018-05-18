import { StyleSheet } from 'react-native'
import { COLOR } from 'react-native-material-ui'

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignSelf: 'stretch', 
    paddingTop: 15
  },
  assetsBackground: {
    backgroundColor: COLOR.teal800
  },
  liabilitiesBackground: {
    backgroundColor: COLOR.red600
  },
  avatarContainer: {
    opacity: 1, 
    height: 70, 
    padding: 0, 
    margin: 0, 
    flex: 1, 
    marginBottom: 15, 
    alignSelf: 'center' 
  },
  headerContainer: {
    alignSelf: 'center'
  },
  headerText: {
    color: COLOR.white,
    lineHeight: 50,
    fontSize: 50
  }
})

export default styles