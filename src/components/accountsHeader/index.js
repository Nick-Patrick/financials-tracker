import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { COLOR, Subheader } from 'react-native-material-ui'
import styles from './styles'

class accountsHeader extends Component {
  getAccountsTotal (accounts) {
    let totalAmount = 0
    
    Object.keys(accounts).map(accountKey => {
      const account = accounts[accountKey]
      if (account.amount) totalAmount += account.amount
    })

    return `£${parseFloat(totalAmount).toFixed(2)}`
  }

  capitalize(string = '') {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  
  render () {
    const { accountType, accounts } = this.props 
    const isAssets = accountType === 'assets'

    return (
      <View style={[ 
        styles.container, 
        isAssets ? styles.containerAssets : styles.containerLiabilities 
        ]}>
        <View style={ styles.totalContainer }>
          <Subheader text={`${this.capitalize(accountType)}`} style={{
              container: styles.totalUpdatedContainer,
              text: styles.totalUpdatedText
            }}
          />
          <Subheader text={ this.getAccountsTotal(accounts) } style={{
              container: styles.totalPriceContainer,
              text: styles.totalPriceText
            }} 
          />
        </View>
        <View style={[ 
          styles.percentageContainer, 
          isAssets ? styles.percentageContainerAssets : styles.percentageContainerLiabilities 
          ]}>
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

export default accountsHeader