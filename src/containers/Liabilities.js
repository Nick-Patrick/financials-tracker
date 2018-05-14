import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { COLOR, ThemeProvider, BottomNavigation, ActionButton, ListItem, Subheader, Divider, Button } from 'react-native-material-ui'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { connect } from 'react-redux'
import AccountsHeader from '../components/accountsHeader'
import AccountList from '../components/AccountList'
import Modal from 'react-native-modal'
import styles from '../components/Account/styles'
import { addAccountAction } from '../actions/accounts'

const uiTheme = {
  palette: {
    primaryColor: COLOR.red400,
  }
}

const navStyle = {
  navBarBackgroundColor: COLOR.red700,
  statusBarColor: COLOR.red800,
  navigationBarColor: COLOR.red800,
  tabBarSelectedButtonColor: COLOR.red800,
  navBarTextColor: COLOR.white,
  navBarComponentAlignment: 'center',
	navBarButtonColor: COLOR.white
}

class LiabilitiesContainer extends Component {
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
          <View style={{ backgroundColor: COLOR.white }}>
            <Subheader text="Add Account"
              style={{ 
                container: {
                  paddingTop: 40,
                  paddingBottom: 40,
                  backgroundColor: isAssets ? COLOR.teal500 : COLOR.red400,
                },
                text: { textAlign: 'center', fontSize: 22, color: COLOR.white } 
              }} />
            <Divider />

            <FormLabel
              labelStyle={styles.labelText}>
                Account Name
            </FormLabel>
            <FormInput 
              onChangeText={ text => this.state.nameText = text }
              maxLength={20}          
              ref={ input => this.nameInput = input }
              inputStyle={styles.textInput}
            />
            { this.state.nameInputError 
              ? <FormValidationMessage>Please enter the name of this {isAsset ? 'asset' : 'liability'} account</FormValidationMessage> 
              : null 
            }

            <FormLabel
              labelStyle={styles.labelText}>
                Account Amount
            </FormLabel>
            <FormInput 
              keyboardType='numeric'
              onChangeText={text => this.state.amountText = text }
              ref={ input => this.amountInput = input }
              inputStyle={styles.textInput}
            />
            { this.state.amountInputError
              ? <FormValidationMessage>Please enter the current value of this {isAsset ? 'asset' : 'liability'} account</FormValidationMessage>
              : null
            }

            <Button accent text="Add Account" 
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
              onPress={this.addAccount.bind(this, isAssets)} />
          </View>
        </Modal>
      </View>
    )
  }

  render() {
    const { liabilities } = this.props

    return (
      <ThemeProvider uiTheme={uiTheme}>
         <View style={{flex: 1}}>
          <AccountsHeader accountType='liabilites' accounts={liabilities} />
          <AccountList accountType='liabilities' accounts={liabilities} {...this.props} navStyle={navStyle}/>
          <ActionButton
            onPress={this.toggleModal}
            style={{container: {flex: 1, backgroundColor: COLOR.red500} }}
          /> 
          { this.renderAddAccountModal(false) }
        </View>
        
      </ThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  const { liabilities } = state
  return {
    liabilities
  }
}

export default connect(mapStateToProps)(LiabilitiesContainer)