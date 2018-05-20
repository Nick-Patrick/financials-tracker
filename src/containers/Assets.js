import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { COLOR, ThemeProvider, BottomNavigation, ActionButton, ListItem, Subheader, Divider, Button } from 'react-native-material-ui'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { connect } from 'react-redux'
import AccountsHeader from '../components/accountsHeader'
import AccountList from '../components/AccountList'
import Modal from 'react-native-modal'
import styles from '../components/Account/styles'
import addAccountStyles from '../components/AddAccount/styles'
import { addAccountAction } from '../actions/accounts'

const uiTheme = {
  palette: {
    primaryColor: COLOR.teal400,
  }
}

const navStyle = {
  navBarBackgroundColor: COLOR.teal600,
  statusBarColor: COLOR.teal700,
  navigationBarColor: COLOR.teal700,
  tabBarSelectedButtonColor: COLOR.teal700,
  navBarTextColor: COLOR.white,
  navBarComponentAlignment: 'center',
  navBarButtonColor: COLOR.white
}

class AssetsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      renderModal: false,
      nameText: null,
      nameInputError: false,
      amountText: null,
      amountInputError: false
    }
  }

  static navigatorStyle = navStyle

  toggleModal = () => {
    this.setState({ 
      amountText: null,
      renderModal: !this.state.renderModal,
      amountInputError: false 
    })
  }

  addAccount(isAssets) {
    this.setState({
      nameInputError: Boolean(!this.state.nameText || !this.state.nameText.length > 0),
      amountInputError: Boolean(!this.state.amountText || !this.state.amountText.length > 0)
    }, (e) => {
      if (!this.state.nameInputError) this.nameInput.shake()
      if (!this.state.amountInputError) this.amountInput.shake()

      if (!this.state.nameInputError && !this.state.amountInputError) {
        const { dispatch, navigator } = this.props
        
        dispatch(addAccountAction(isAssets, {
          name: this.state.nameText,
          amount: parseFloat(this.state.amountText)
        }))

        return this.toggleModal()
      }
    }) 
  }

  renderAddAccountModal(isAssets) {
    return (
      <View>
        <Modal
          useNativeDriver={true}
          onBackdropPress={this.toggleModal}
          onBackButtonPress={this.toggleModal}
          isVisible={this.state.renderModal}>
          <View style={ addAccountStyles.modalContainer }>
            <Subheader text="Add Asset"
              style={{ 
                container: [
                  addAccountStyles.modalHeaderContainer,
                  isAssets ? addAccountStyles.modalHeaderContainerAssets : addAccountStyles.modalHeaderContainerLiabilities
                ],
                text: addAccountStyles.modalHeaderText 
              }} />
            <Divider />

            <FormLabel
              labelStyle={styles.labelText}>
                Asset Name
            </FormLabel>
            <FormInput 
              onChangeText={ text => this.state.nameText = text }
              maxLength={20}          
              ref={ input => this.nameInput = input }
              inputStyle={styles.textInput}
            />
            { this.state.nameInputError 
              ? <FormValidationMessage>Please enter the name of this {isAssets ? 'asset' : 'liability'}</FormValidationMessage> 
              : null 
            }

            <FormLabel
              labelStyle={styles.labelText}>
                Asset Amount
            </FormLabel>
            <FormInput 
              keyboardType='numeric'
              onChangeText={text => this.state.amountText = text }
              ref={ input => this.amountInput = input }
              inputStyle={styles.textInput}
            />
            { this.state.amountInputError
              ? <FormValidationMessage>Please enter the current value of this {isAssets ? 'asset' : 'liability'}</FormValidationMessage>
              : null
            }

            <Button accent text="Add Asset" 
              style={{
                container: addAccountStyles.submitButtonContainer,
                text: [
                  addAccountStyles.submitButtonText,
                  isAssets ? addAccountStyles.submitButtonTextAssets : addAccountStyles.submitButtonTextLiabilities
                ]
              }}
              onPress={this.addAccount.bind(this, isAssets)} />
          </View>
        </Modal>
      </View>
    )
  }

  render() {
    const { assets } = this.props

    return (
      <ThemeProvider style={{ flex: 1 }} uiTheme={uiTheme}>
        <View style={{ flex: 1 }}>
          <AccountsHeader accountType='assets' accounts={assets} />
          <AccountList accountType='assets' accounts={assets} {...this.props} navStyle={navStyle}/>
          <ActionButton
            onPress={this.toggleModal}
            style={{container: {flex: 1, backgroundColor: COLOR.teal500} }}
          />
          { this.renderAddAccountModal(true) }
        </View>
      </ThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { assets } = state
  console.log('assets', assets)
  return {
    assets
  }
}

export default connect(mapStateToProps)(AssetsContainer)