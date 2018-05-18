import { StyleSheet } from 'react-native'
import { COLOR } from 'react-native-material-ui'

const styles = StyleSheet.create({
  container: {
    flex: 3,
    height: 20
  },
  text: {
    lineHeight: 20,
    fontWeight: '500'
  },
  positiveText: {
    color: COLOR.teal300
  },
  negativeText: {
    color: COLOR.red400
  },
  assetsBackground: {
    backgroundColor: COLOR.teal800
  },
  liabilitiesBackground: {
    backgroundColor: COLOR.red600
  }
})

export default styles