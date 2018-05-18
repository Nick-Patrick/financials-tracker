import React, { Component } from 'react'
import { View } from 'react-native'
import { Subheader, Divider, Button } from 'react-native-material-ui'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Modal from 'react-native-modal'
import styles from './styles'

class RenameModal extends Component {
  render () {
    const { isAssets, isVisible, handleModalHide, handleChangeText, accountNameError, accountNameInput, onSubmit } = this.props

    return (
      <View>
        <Modal 
          useNativeDriver={true}
          onBackdropPress={handleModalHide}
          onBackButtonPress={handleModalHide}
          isVisible={isVisible}>
          <View style={styles.modalContainer}>
            <Subheader text="Edit"
              style={{ 
                container: [
                  styles.headerContainer,
                  isAssets ? styles.assetsBackground : styles.liabilitiesBackground
                ],
                text: styles.headerText 
              }} />
              <Divider />
              <FormLabel labelStyle={styles.labelText}>
                New Name:
              </FormLabel>
              <FormInput 
                onChangeText={ handleChangeText }
                ref={ accountNameInput }
                inputStyle={styles.accountNameInput}
                containerStyle={styles.accountNameContainer}
              />
              { accountNameError
                ? <FormValidationMessage>Please enter a new name</FormValidationMessage>
                : null
              }
              <Button accent text={`Rename ${isAssets ? 'Asset' : 'Liability'}`} 
                style={{
                  container: styles.buttonContainer,
                  text: [
                    styles.buttonText,
                    isAssets ? styles.assetsButtonText : styles.liabilitiesButtonText
                  ]
                }}
              onPress={ onSubmit } />
          </View>
        </Modal>
      </View>
    )
  }
}

export default RenameModal