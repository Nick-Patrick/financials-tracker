import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { COLOR, Subheader } from 'react-native-material-ui'
import styles from './styles'

class reportsHeader extends Component {
  getAccountsTotal (assets, liabilities) {
    const assetsTotal = this.getAccountsTotalByType(assets)
    const liabilitiesTotal = this.getAccountsTotalByType(liabilities)

    return `£${parseFloat(assetsTotal - liabilitiesTotal).toFixed(2)}`
  }

  getAccountsTotalByType (accounts) {
    let totalAmount = 0
    
    Object.keys(accounts).map(accountKey => {
      const account = accounts[accountKey]
      if (account.amount) totalAmount += account.amount
    })

    return parseFloat(totalAmount).toFixed(2)
  }
  
  render () {
    const { assets, liabilities } = this.props 

    return (
      <View style={ styles.container }>
        <View style={ styles.totalContainer }>
          <Subheader text="Net Worth" style={{
              container: styles.totalUpdatedContainer,
              text: styles.totalUpdatedText
            }}
          />
          <Subheader text={ this.getAccountsTotal(assets, liabilities) } style={{
              container: styles.totalPriceContainer,
              text: styles.totalPriceText
            }} 
          />
        </View>
        <View style={styles.percentageContainer }>
          <View style={ styles.percentageAmountContainer }>
            <Subheader text="+5.4%" style={{
              container: styles.percentageAmountTextContainer,
                text: styles.percentageAmountText
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <Subheader text="Past Month" style={{
              container: styles.percentageTimePeriodContainer,
                text: styles.percentageTimePeriodText
              }}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default reportsHeader