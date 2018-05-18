import React, { Component } from 'react'
import { View } from 'react-native'
import { Subheader } from 'react-native-material-ui'
import { Avatar } from 'react-native-elements'
import styles from './styles'

class AccountDifference extends Component {
  render() {
    const { isAssets, oldAccount, newAccount } = this.props
    if (!oldAccount || !newAccount) return null
    
    const difference = newAccount.amount - oldAccount.amount
    if (difference === 0) return null

    return (
      <Subheader
        style={{
          container: styles.container,
          text: [ 
            styles.text,
            isAssets 
              ? (difference > 0 ? styles.positiveText : styles.negativeText) 
              : (difference < 0 ? styles.positiveText : styles.negativeText)
          ]
        }} 
        text={ difference > 0 
          ? `(+${parseFloat(difference).toFixed(2)})` 
          : difference < 0 ? `(${parseFloat(difference).toFixed(2)})` 
          : null } 
      />
    )
  }
}

export default AccountDifference