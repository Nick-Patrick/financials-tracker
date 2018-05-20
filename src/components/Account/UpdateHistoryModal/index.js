import React, { Component } from 'react'
import { View } from 'react-native'
import { Subheader, Divider, Button, COLOR } from 'react-native-material-ui'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Modal from 'react-native-modal'
import styles from './styles'
import moment from 'moment'

class UpdateHistoryModal extends Component {
  renderRemoveButton (isAssets, onRemove, isInitialAccount) {
    if (isInitialAccount) return null

    return (
      <Button accent text="Remove" 
        style={{
          container: styles.buttonContainer,
          text: [
            styles.buttonText,
            isAssets ? styles.assetsButtonText : styles.liabilitiesButtonText
          ]
        }}
        onPress={onRemove} />
      )
  }

  render () {
    const { 
      isAssets, 
      isVisible, 
      handleModalHide, 
      accountDate, 
      handleDatePicker, 
      handleChangeAmount, 
      accountAmountInput, 
      onSubmit,
      currentAmount,
      onRemove,
      isInitialAccount
    } = this.props

    return (
      <View>
        <Modal 
          style={{ justifyContent: 'flex-end', margin: 0 }}
          backdropOpacity={0.3}
          backdropTransitionInTiming={100}
          backdropTransitionOutTiming={100}
          useNativeDriver={true}
          onBackdropPress={handleModalHide}
          onBackButtonPress={handleModalHide}
          isVisible={isVisible}>  
          <View style={{ backgroundColor: COLOR.white }}>
            <Subheader text={`Update History`}
              style={{ 
                container: [
                  styles.headerContainer,
                  isAssets ? styles.assetsBackground : styles.liabilitiesBackground
                ],
                text: styles.headerText 
              }} />
              <Divider />
              <FormLabel labelStyle={styles.labelText}>{ `Current Amount: £${parseFloat(currentAmount).toFixed(2)}` }</FormLabel>
              <FormInput 
                keyboardType='numeric'
                onChangeText={handleChangeAmount}
                ref={ accountAmountInput }
                inputStyle={styles.textInput}
              />
              <Button style={{ container: { height: 60 } }} onPress={handleDatePicker} text={ moment(accountDate).format('ddd MMM Do YYYY') } />
              <View style={ styles.buttonsContainer }>

                { this.renderRemoveButton(isAssets, onRemove, isInitialAccount) }
                
                <Button accent text="Update" 
                  style={{
                    container: [
                      styles.buttonContainerFilled,
                      isAssets ? styles.assetsBackground : styles.liabilitiesBackground
                    ],
                    text: styles.buttonTextFilled
                  }}
                onPress={onSubmit} />
              </View>
          </View>
        </Modal>        
      </View>
    )
  }
}

export default UpdateHistoryModal