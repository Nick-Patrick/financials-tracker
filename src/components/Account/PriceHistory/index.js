import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'
import { Subheader, Divider, Button, COLOR, Icon } from 'react-native-material-ui'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Modal from 'react-native-modal'
import styles from './styles'
import AccountDifference from '../AccountDifference'
import moment from 'moment'

class PriceHistory extends Component {
  render () {
    let { history = [], isAssets, handleModal } = this.props
    if (!history.length) return null
    history.sort((b, a) => new Date(a.updated) - new Date(b.updated))

    return (
      <View style={{ flex: 1, paddingRight: 20, alignSelf: 'stretch' }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="history" style={{ paddingTop: 12, margin: 0, paddingLeft: 10 }}/>
          <Subheader text={`${isAssets ? 'Asset' : 'Liability'} History`} style={{ container: { marginLeft: -10 }, text: { fontSize: 18 } }}/>
        </View>
        <Divider />
        { history.map((account = {}, index) => {
          const previousAccount = history[index + 1]

          return (
            <TouchableHighlight underlayColor={COLOR.grey200} key={index} onPress={handleModal.bind(this, account)}>
              <View style={{ flex: 1, alignSelf: 'stretch', marginBottom: 1, paddingTop: 10, paddingBottom: 10, borderColor: COLOR.teal50, borderBottomWidth: 1}}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', flex: 1 }}>
                      <Subheader text={account.created ? 'Initial Balance' : `Balance Updated`} style={{ container: { height: 20, flex: 4 }, text: { lineHeight: 20 } }}/>
                      <AccountDifference isAssets={isAssets} oldAccount={previousAccount} newAccount={account} />
                    </View>
                    <Subheader text={moment(account.updated).format('MMM D YYYY')} style={{ container: { height: 20 }, text: { lineHeight: 20, fontSize: 10, fontWeight: '200', color: COLOR.grey400 } }}/>
                  </View>
                  <View style={{ flex: 1, alignItems: 'flex-end'}}>
                    <Subheader text={`£${parseFloat(account.amount).toFixed(2)}`} style={{ container: { height: 40 }, text: { fontSize: 18, lineHeight: 40 } }} />
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          )
        })}

      </View>
    )
  }
}

export default PriceHistory