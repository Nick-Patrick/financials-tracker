import React, { Component } from 'react'
import { View, Text, TextInput, ScrollView } from 'react-native'
import { ThemeProvider, Button, COLOR, Subheader, Divider } from 'react-native-material-ui'
import styles from './styles'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { addAccountAction } from '../../actions/accounts'
import Modal from 'react-native-modal'

const uiTheme = {
  palette: {
    primaryColor: COLOR.teal400,
    secondaryColor: COLOR.red500
  }
}

class AddAccount extends Component {
  updateAccount(props, state, isAssets) {
    
  }

  renderUpdateModal(props, state) {
    const { isAssets, visible } = props
    
    return (
      <View>
        <Modal
          useNativeDriver={true}
          onBackdropPress={this.props.toggleModal}
          onBackButtonPress={this.props.toggleModal}
          isVisible={visible}>
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
              onChangeText={ text => state.nameText = text }
              maxLength={20}          
              ref={ input => this.nameInput = input }
              inputStyle={styles.textInput}
            />
            { state.nameInputError 
              ? <FormValidationMessage>Please enter the name of this {isAsset ? 'asset' : 'liability'} account</FormValidationMessage> 
              : null 
            }

            <FormLabel
              labelStyle={styles.labelText}>
                Account Amount
            </FormLabel>
            <FormInput 
              keyboardType='numeric'
              onChangeText={text => state.amountText = text }
              ref={ input => this.amountInput = input }
              inputStyle={styles.textInput}
            />
            { state.amountInputError
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
              onPress={this.props.addAccount.bind(this, props, state)} />
          </View>
        </Modal>
      </View>
    )
  }

  render () {
    return this.renderUpdateModal(this.props, this.state)
  }
}

export default AddAccount