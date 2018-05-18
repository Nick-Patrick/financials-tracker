import React, { Component } from 'react'
import { View } from 'react-native'
import { Subheader, Divider, Button, COLOR } from 'react-native-material-ui'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Modal from 'react-native-modal'
import styles from './styles'
import moment from 'moment'

class UpdateModal extends Component {
  render () {
    const { 
      isAssets, 
      isVisible, 
      handleModalHide, 
      accountDate, 
      handleDatePicker, 
      handleChangeAmount, 
      accountAmountInput, 
      amountInputError, 
      onSubmit,
      currentAmount
    } = this.props

    return (
      <View>
        <Modal
          useNativeDriver={true}
          onBackdropPress={handleModalHide}
          onBackButtonPress={handleModalHide}
          isVisible={isVisible}>
          <View style={{ backgroundColor: COLOR.white }}>
            <Subheader text={`Update ${isAssets ? 'Asset' : 'Liability'}`}
              style={{ 
                container: [
                  styles.headerContainer,
                  isAssets ? styles.assetsBackground : styles.liabilitiesBackground
                ],
                text: styles.headerText 
              }} />
            <Divider />
            <FormLabel labelStyle={styles.labelText}>{ `Current Amount: £${parseFloat(currentAmount).toFixed(2)}` }</FormLabel>
            <FormLabel labelStyle={styles.labelText}>
                New Amount:
            </FormLabel>
            <FormInput 
              keyboardType='numeric'
              onChangeText={ handleChangeAmount }
              ref={ accountAmountInput }
              inputStyle={styles.textInput}
            />
            { amountInputError
              ? <FormValidationMessage>Please enter the current value of this {isAssets ? 'asset' : 'liability'} account</FormValidationMessage>
              : null
            }

            <Button style={{ container: { height: 60 } }} onPress={handleDatePicker} text={ moment(accountDate).format('ddd MMM Do YYYY') } />

            <Button accent text={`Update ${isAssets ? 'Asset' : 'Liability'}`} 
              style={{
                container: styles.buttonContainer,
                text: [
                  styles.buttonText,
                  isAssets ? styles.assetsButtonText : styles.liabilitiesButtonText
                ]
              }}
              onPress={onSubmit} />
          </View>
        </Modal>
      </View>
    )
  }
}

export default UpdateModal