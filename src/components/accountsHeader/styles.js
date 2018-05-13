import { StyleSheet } from 'react-native'
import { COLOR } from 'react-native-material-ui'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    height: 104
  },

  containerAssets: {
    backgroundColor: COLOR.teal400
  },

  containerLiabilities: {
    backgroundColor: COLOR.red600
  },

  totalContainer: {
    flex: 5,
    flexDirection: 'column', 
    justifyContent: 'center'
  },

  totalUpdatedContainer: {
    height: 24,
    paddingTop: 10,
  },
  
  totalUpdatedText: {
    color: COLOR.grey200,
    fontSize: 14
  },

  totalPriceContainer: {
    height: 40
  },

  totalPriceText: {
    lineHeight: 40,
    fontSize: 34,
    padding: 0,
    color: COLOR.white
  },

  percentageContainer: {
    flex: 2, 
    paddingRight: 10, 
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center'
  },

  percentageContainerAssets: {
    backgroundColor: COLOR.teal500,
  },

  percentageContainerLiabilities: {
    backgroundColor: COLOR.red700
  },

  percentageAmountContainer: {
    flex: 2
  },

  percentageAmountTextContainer: {
    height: 80,
    padding: 0
  },
  
  percentageAmountText: {
    fontSize: 24,
    color: COLOR.white
  },

  percentageTimePeriodContainer: {
    height: 0
  },

  percentageTimePeriodText: {
    fontSize: 14,
    color: COLOR.grey200
  }
})

export default styles
