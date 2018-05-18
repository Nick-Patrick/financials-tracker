import React, { Component } from 'react'
import { View } from 'react-native'
import { Subheader } from 'react-native-material-ui'
import { Avatar } from 'react-native-elements'
import styles from './styles'

class AmountHeader extends Component {
  render() {
    const { isAssets, amount } = this.props

    return (
      <View style={[ 
        styles.container,
        isAssets ? styles.assetsBackground : styles.liabilitiesBackground
      ]}>
        <Avatar
          xlarge
          icon={{ name: isAssets ? 'monetization-on' : 'money-off' }}
          overlayContainerStyle={ isAssets ? styles.assetsBackground : styles.liabilitiesBackground }
          containerStyle={ styles.avatarContainer }
        />

        <Subheader text={`£${parseFloat(amount).toFixed(2)}`} 
          style={{
            container: styles.headerContainer,
            text: styles.headerText
          }}
        />
      </View>
    )
  }
}

export default AmountHeader