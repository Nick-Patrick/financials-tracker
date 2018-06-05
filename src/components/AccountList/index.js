import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { ListItem, Subheader, COLOR } from 'react-native-material-ui'
import styles from './styles'
import moment from 'moment'

class AccountList extends Component {
  render () {
    const { accountType, accounts } = this.props 
    const isAssets = accountType === 'assets'

    return (
      <ScrollView>
        {
          Object.keys(accounts).map(accountKey => {
            let account = accounts[accountKey]
            // account.id = accountKey

            return (
              <TouchableHighlight key={accountKey} onPress={this.goToAccount.bind(this, account, isAssets)}>
                <View style={{ borderColor: COLOR.teal50, borderBottomWidth: 1, borderTopWidth: 1, backgroundColor: COLOR.white, flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 5, flexDirection: 'column', justifyContent: 'space-around' }}>
                    <View style={{ flex: 4 }}>
                      <Subheader text={ account.name } style={{ text: { fontSize: 20 }}} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Subheader text={ `Updated: ${moment(account.lastUpdated).format('MMM D YYYY')}` } style={{ text: { fontSize: 11 }}} />
                    </View>
                  </View>
                  <View style={{ flex: 3, alignItems: 'flex-end', justifyContent: 'space-around', paddingRight: 20, flexDirection: 'column' }}>
                    <View style={{ flex: 1 }}>
                      <Subheader text={ `£${parseFloat(account.amount).toFixed(2)}` } style={{ text: { lineHeight: 50, fontSize: 26 } }}/>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Subheader text='+2.3%' style={{ text: { fontSize: 13 } }}/>
                    </View>
                  </View>
                </View>
              </TouchableHighlight>
            )
        }) }
      </ScrollView>
    )
  }

  goToAccount(account, isAssets) {
    this.props.navigator.push({
      screen: 'networth.Account',
      title: account.name,
      animated: true,
      navigatorStyle: this.props.navStyle,
      animationType: 'slide-horizontal',
      passProps: {
        account,
        isAssets
      }
    })
  }
}

export default AccountList