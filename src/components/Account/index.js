import React, { Component } from 'react'
import { View, Text, ScrollView, TouchableHighlight } from 'react-native'
import { ThemeProvider, Subheader, COLOR, Divider, Icon, Button } from 'react-native-material-ui'
import { Avatar, FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import styles from './styles'
import moment from 'moment'
import Modal from 'react-native-modal'
import { updateAccountAction, deleteAccountAction, renameAccountAction, updateAccountHistoryAction } from '../../actions/accounts'
import DateTimePicker from 'react-native-modal-datetime-picker'
import AmountHeader from './AmountHeader'
import AmountGraph from './AmountGraph'
import AccountDifference from './AccountDifference'

let uiTheme = {
  palette: {
    primaryColor: COLOR.teal400,
  }
}

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isDateTimePickerVisible: false,
      accountDate: new Date(),
      renderModal: false,
      renderDeleteModal: false,
      renderRenameModal: false,
      accountNameText: null,
      accountNameError: false,
      amountText: null,
      amountInputError: false,
      historyAccountSelected: null,
      showUpdateHistoryModal: false,
      historyAccountDate: null,
      historyAccountAmount: null,
      accountHistoryAmountInput: null,
      isHistoryDatePickerVisible: false
    }

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  onNavigatorEvent (event) { 
    if (event.type == 'NavBarButtonPress') {
      if (event.id == 'remove') this.toggleDeleteModal()
      if (event.id == 'edit') this.toggleRenameModal()
    }
  }

  renderPriceHistory(history = [], isAssets) {
    history = history.sort((b, a) => new Date(a.updated) - new Date(b.updated))

    return (
      <View style={{ flex: 1, paddingRight: 20, alignSelf: 'stretch' }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="history" style={{ paddingTop: 12, margin: 0, paddingLeft: 10 }}/>
          <Subheader text={`${isAssets ? 'Asset' : 'Liability'} History`} style={{ container: { marginLeft: -10 }, text: { fontSize: 18 } }}/>
        </View>
        <Divider />
        { history.map((account, index) => {
          const previousAccount = history[index + 1]

          return (
            <TouchableHighlight underlayColor={COLOR.grey200} key={index} onPress={this.showUpdateHistoryModal.bind(this, account)}>
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

  renderUpdateAccount(account, isAssets) {
    return (
      <View style={{ paddingTop: 20, paddingBottom: 10 }}>
        <Button raised text={`Update ${isAssets ? 'asset' : 'Liability'}`} style={{
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
          amount: parseFloat(this.state.amountText),
          date: this.state.accountDate
        }))
        
        return this.toggleModal()
      }
    }) 
  }

  showUpdateHistoryModal = (account) => {
    this.setState({
      historyAccountSelected: account,
      showUpdateHistoryModal: true
    })
  }

  hideUpdateHistoryModal = () => {
    this.setState({
      historyAccountSelected: null,
      showUpdateHistoryModal: false
    })
  }

  toggleModal = () => {
    this.setState({ 
      amountText: null,
      renderModal: !this.state.renderModal,
      amountInputError: false 
    })
  }

  toggleDeleteModal = () => this.setState({ renderDeleteModal: !this.state.renderDeleteModal})

  toggleRenameModal = () => {
    this.setState({ 
      renderRenameModal: !this.state.renderRenameModal,
      accountNameText: null,
      accountNameError: false
    })
  }

  toggleDatePicker = () => this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible })
  toggleHistoryDatePicker = () => this.setState({ isHistoryDatePickerVisible: !this.state.isHistoryDatePickerVisible })

  renderDeleteModal(account, isAssets) {
    return (
      <View>
        <Modal 
          useNativeDriver={true}
          onBackdropPress={this.toggleDeleteModal}
          onBackButtonPress={this.toggleDeleteModal}
          isVisible={this.state.renderDeleteModal}>
          <View style={{ backgroundColor: COLOR.white }}>
            <Subheader text="Are you sure?"
             style={{ 
                container: [
                  styles.modalSubheaderContainer,
                  isAssets ? styles.modalSubheaderContainerAssets : styles.modalSubheaderContainerLiabilities
                ],
                text: styles.modalSubheaderText 
              }} />
              <Divider />
              <Button accent text={`Delete ${isAssets ? 'Asset' : 'Liability'}`} 
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
              onPress={this.deleteAccount.bind(this, account, isAssets)} />
          </View>
        </Modal>
      </View>
    )
  }

  renderRenameModal(account, isAssets) {
    return (
      <View>
        <Modal 
          useNativeDriver={true}
          onBackdropPress={this.toggleRenameModal}
          onBackButtonPress={this.toggleRenameModal}
          isVisible={this.state.renderRenameModal}>
          <View style={{ backgroundColor: COLOR.white }}>
            <Subheader text={`Edit`}
              style={{ 
                container: [
                  styles.modalSubheaderContainer,
                  isAssets ? styles.modalSubheaderContainerAssets : styles.modalSubheaderContainerLiabilities
                ],
                text: styles.modalSubheaderText 
              }} />
              <Divider />
              <FormLabel labelStyle={styles.labelText}>
                New Name:
              </FormLabel>
              <FormInput 
                onChangeText={text => this.state.accountNameText = text }
                ref={ input => this.accountNameInput = input }
                inputStyle={styles.accountNameInput}
                containerStyle={styles.accountNameContainer}
              />
              { this.state.accountNameError
                ? <FormValidationMessage>Please enter a new name</FormValidationMessage>
                : null
              }
              <Button accent text={`Rename ${isAssets ? 'Asset' : 'Liability'}`} 
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
              onPress={this.renameAccount.bind(this, account, isAssets)} />
          </View>
        </Modal>
      </View>
    )
  }

  deleteAccount(account, isAssets) {
    this.toggleModal()
    this.props.navigator.pop()
    this.props.dispatch(deleteAccountAction(isAssets, account))
  }

  renameAccount(account, isAssets) {
    this.setState({
      accountNameError: Boolean(!this.state.accountNameText || !this.state.accountNameText.length > 0)
    }, e => {
      if (!this.state.accountNameError) this.accountNameInput.shake()

      if (!this.state.accountNameError) {
        this.props.dispatch(renameAccountAction(isAssets, account, this.state.accountNameText))
        this.props.navigator.setTitle({
          title: this.state.accountNameText
        })
        
        return this.toggleRenameModal()
      }
    })  
  }

  handleDatePicked (date) {
    this.toggleDatePicker()
    this.setState({ accountDate: date })
  }

  handleHistoryDatePicked (date) {
    this.toggleHistoryDatePicker()
    this.setState({ historyAccountDate: date })
  }

  renderUpdateHistoryModal(isAssets, parentAccount) {
    const account = this.state.historyAccountSelected || {}
    const accountDate = this.state.historyAccountDate || account.updated
    return (
      <View>
        <Modal 
          style={{ justifyContent: 'flex-end', margin: 0 }}
          backdropOpacity={0.3}
          backdropTransitionInTiming={100}
          backdropTransitionOutTiming={100}
          useNativeDriver={true}
          onBackdropPress={this.hideUpdateHistoryModal}
          onBackButtonPress={this.hideUpdateHistoryModal}
          isVisible={this.state.showUpdateHistoryModal}>  
          <View style={{ backgroundColor: COLOR.white }}>
            <Subheader text={`Update History`}
              style={{ 
                container: [
                  styles.modalSubheaderContainer
                ],
                text: styles.modalSubheaderText
              }} />
              <Divider />
              <FormLabel labelStyle={styles.labelText}>{ `Current Amount: £${parseFloat(account.amount).toFixed(2)}` }</FormLabel>
              <FormInput 
                keyboardType='numeric'
                onChangeText={text => this.state.accountHistoryAmountText = text }
                ref={ input => this.accountHistoryAmountInput = input }
                inputStyle={styles.textInput}
              />
              <Button style={{ container: { height: 60 } }} onPress={this.toggleHistoryDatePicker.bind(this)} text={ moment(accountDate).format('ddd MMM Do YYYY') } />
              <Button accent text="Update" 
                style={{
                  container: {
                    padding: 40,
                    marginBottom: 20
                  },
                  text: {
                    padding: 10,
                    fontSize: 24,
                    borderBottomWidth: 1,
                    borderColor: isAssets ? COLOR.teal500 : COLOR.red400,
                    color: isAssets ? COLOR.teal500 : COLOR.red400
                  }
                }}
              onPress={this.updateHistory.bind(this, isAssets, parentAccount)} />
          </View>
        </Modal>        
      </View>
    )
  }

  updateHistory(isAssets, parentAccount) {
    this.props.dispatch(updateAccountHistoryAction(isAssets, parentAccount, { 
      id: this.state.historyAccountSelected.id,
      amount: parseFloat(this.state.accountHistoryAmountText || this.state.historyAccountSelected.amount),
      date: this.state.historyAccountDate || this.state.historyAccountSelected.updated
    }))

    this.setState({
      accountHistoryAmountText: null,
      historyAccountDate: null
    })
        
    return this.hideUpdateHistoryModal()
  }

  getCurrentAmount(account) {
    const mostRecent = account.history.sort((b, a) => new Date(a.updated) - new Date(b.updated))
    return mostRecent[0].amount
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
            <Subheader text={`Update ${isAssets ? 'Asset' : 'Liability'}`}
              style={{ 
                container: [
                  styles.modalSubheaderContainer,
                  isAssets ? styles.modalSubheaderContainerAssets : styles.modalSubheaderContainerLiabilities
                ],
                text: styles.modalSubheaderText 
              }} />
            <Divider />
            <FormLabel labelStyle={styles.labelText}>{ `Current Amount: £${parseFloat(this.getCurrentAmount(account)).toFixed(2)}` }</FormLabel>
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

            <Button style={{ container: { height: 60 } }} onPress={this.toggleDatePicker.bind(this)} text={ moment(this.state.accountDate).format('ddd MMM Do YYYY') } />

            <Button accent text={`Update ${isAssets ? 'Asset' : 'Liability'}`} 
              style={{
                container: {
                  padding: 40,
                  marginBottom: 20
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

  renderDatePicker () {
    return (
      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this.handleDatePicked.bind(this)}
        onCancel={this.toggleDatePicker.bind(this)}
      />
    )
  }

  renderHistoryDatePicker () {
    return (
      <DateTimePicker
        isVisible={this.state.isHistoryDatePickerVisible}
        onConfirm={this.handleHistoryDatePicked.bind(this)}
        onCancel={this.toggleHistoryDatePicker.bind(this)}
      />
    )
  }

  render () {
    const { currentAccount = {}, isAssets } = this.props 

    return (
      <ThemeProvider uiTheme = {uiTheme}>
        <ScrollView>
          <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <AmountHeader amount={this.getCurrentAmount(currentAccount)} isAssets={isAssets} />
            <AmountGraph accountHistory={currentAccount.history} isAssets={isAssets} />
            { this.renderUpdateAccount(currentAccount, isAssets)}
            { this.renderPriceHistory(currentAccount.history, isAssets) }
            { this.renderUpdateModal(currentAccount, isAssets) }
            { this.renderDeleteModal(currentAccount, isAssets) }
            { this.renderRenameModal(currentAccount, isAssets) }
            { this.renderDatePicker() }
            { this.renderHistoryDatePicker() }
            { this.renderUpdateHistoryModal(isAssets, currentAccount) }
          </View>
        </ScrollView>
      </ThemeProvider>
    )
  }
}

export default Account