import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { ThemeProvider, Subheader, COLOR, Divider, Icon, Button } from 'react-native-material-ui'
import { Avatar, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import moment from 'moment'
import Modal from 'react-native-modal'
import { updateAccountAction } from '../../actions/accounts'

let uiTheme = {
  palette: {
    primaryColor: COLOR.teal400,
  }
}

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderModal: false,
      amountText: null,
      amountInputError: false
    }
  }

  renderAmount(amount, isAssets) {
    return (
      <View style={{
        flex: 1, 
        backgroundColor: isAssets ? COLOR.teal800 : COLOR.red600, 
        alignSelf: 'stretch', 
        padding: 15
      }}>
        <Avatar
          xlarge
          icon={{
            name: isAssets ? 'monetization-on' : 'money-off'
          }}
          overlayContainerStyle={{
            backgroundColor: isAssets ? COLOR.teal800 : COLOR.red600
          }}
          containerStyle={{ opacity: 1, height: 70, padding: 0, margin: 0, flex: 1, marginBottom: 15, alignSelf: 'center' }}
        />

        <Subheader text={`£${parseFloat(amount).toFixed(2)}`} 
          style={{
            container: {
              alignSelf: 'center'
            },
            text: {
              color: COLOR.white,
              lineHeight: 50,
              fontSize: 50
            }
          }}
        />
      </View>
    )
  }

  getAccountDifference(oldAccount, newAccount) {
    if (!oldAccount || !newAccount) return null
    const difference = newAccount.amount - oldAccount.amount

    return (
      <Subheader
        style={{
          container: {
            marginLeft: -20,
            flex: 1,
            height: 20
          },
          text: {
            lineHeight: 20,
            fontWeight: '500',
            color: difference > 0 ? COLOR.teal300 : COLOR.red400
          }
        }} text={difference > 0 ? `(+${parseFloat(difference).toFixed(2)})` : difference < 0 ? `(${parseFloat(difference).toFixed(2)})` : null} />
    )
  }

  renderPriceHistory(history) {
    return (
      <View style={{ flex: 1, paddingRight: 20, alignSelf: 'stretch' }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="history" style={{ paddingTop: 12, margin: 0, paddingLeft: 10 }}/>
          <Subheader text="Account History" style={{ container: { marginLeft: -10 }, text: { fontSize: 18 } }}/>
        </View>
        <Divider />

        { history.map((account, index) => {
          const previousAccount = history[index + 1]

          return (
            <TouchableHighlight key={index}>
              <View style={{ flex: 1, alignSelf: 'stretch', marginBottom: 1, paddingTop: 10, paddingBottom: 10, borderColor: COLOR.teal50, borderBottomWidth: 1}}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-around' }}>
                      <Subheader text={account.created ? 'Account Created' : `Value Updated`} style={{ container: { height: 20, flex: 1 }, text: { lineHeight: 20 } }}/>
                      { this.getAccountDifference(previousAccount, account) }
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

  renderUpdateAccount(account, isAssets) {
    return (
      <View style={{ paddingTop: 20, paddingBottom: 10 }}>
        <Button raised text="Update Account" style={{
          container: {
            backgroundColor: isAssets ? COLOR.teal500 : COLOR.red400,
            padding: 30, 
            paddingLeft: 40, 
            paddingRight: 40 
          },
          text: {
            fontSize: 20,
            color: COLOR.white
          }
        }}
        onPress={this.toggleModal}/> 
      </View>
    )
  }

  updateAccount(account, isAssets) {
    this.setState({
      amountInputError: Boolean(!this.state.amountText || !this.state.amountText.length > 0)
    }, e => {
      if (!this.state.amountInputError) this.amountInput.shake()

      if (!this.state.amountInputError) {
        this.props.dispatch(updateAccountAction(isAssets, { 
          id: account.id,
          amount: parseFloat(this.state.amountText) 
        }))
        
        return this.toggleModal()
      }
    }) 
  }

  toggleModal = () => {
    this.setState({ 
      amountText: null,
      renderModal: !this.state.renderModal,
      amountInputError: false 
    })
  }

  renderUpdateModal(account, isAssets) {
    return (
      <View>
        <Modal
          useNativeDriver={true}
          onBackdropPress={this.toggleModal}
          onBackButtonPress={this.toggleModal}
          isVisible={this.state.renderModal}>
          <View style={{ backgroundColor: COLOR.white }}>
            <Subheader text="Update Account"
              style={{ 
                container: {
                  paddingTop: 40,
                  paddingBottom: 40,
                  backgroundColor: isAssets ? COLOR.teal500 : COLOR.red400,
                },
                text: { textAlign: 'center', fontSize: 22, color: COLOR.white } 
              }} />
            <Divider />
            <FormLabel labelStyle={styles.labelText}>{ `Current Amount: £${parseFloat(account.amount).toFixed(2)}` }</FormLabel>
            <FormLabel labelStyle={styles.labelText}>
                New Amount:
            </FormLabel>
            <FormInput 
              keyboardType='numeric'
              onChangeText={text => this.state.amountText = text }
              ref={ input => this.amountInput = input }
              inputStyle={styles.textInput}
            />
            { this.state.amountInputError
              ? <FormValidationMessage>Please enter the current value of this {isAssets ? 'asset' : 'liability'} account</FormValidationMessage>
              : null
            }

            <Button accent text="Update Account" 
              style={{
                container: {
                  padding: 40,
                  margin: 20
                },
                text: {
                  padding: 10,
                  fontSize: 24,
                  borderBottomWidth: 1,
                  borderColor: isAssets ? COLOR.teal500 : COLOR.red400,
                  color: isAssets ? COLOR.teal500 : COLOR.red400
                }
              }}
              onPress={this.updateAccount.bind(this, account, isAssets)} />
          </View>
        </Modal>
      </View>
    )
  }

  render () {
    const { currentAccount, accountType } = this.props 
    const isAssets = accountType === 'assets'
    
    return (
      <ThemeProvider uiTheme = {uiTheme}>
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            { this.renderAmount(currentAccount.amount, isAssets) }
            { this.renderUpdateAccount(currentAccount, isAssets)}
            { this.renderPriceHistory(currentAccount.history) }
            { this.renderUpdateModal(currentAccount, isAssets) }
          </View>
        </ScrollView>
      </ThemeProvider>
    )
  }
}

export default Account