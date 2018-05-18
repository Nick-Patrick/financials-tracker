import React, { Component } from 'react'
import { View } from 'react-native'
import { Subheader, Divider, Button, COLOR } from 'react-native-material-ui'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import Modal from 'react-native-modal'
import styles from './styles'

class DeleteModal extends Component {
  render () {
    const { isAssets, isVisible, handleModalHide, onSubmit } = this.props

    return (
      <View>
        <Modal 
          useNativeDriver={true}
          onBackdropPress={handleModalHide}
          onBackButtonPress={handleModalHide}
          isVisible={isVisible}>
          <View style={{ backgroundColor: COLOR.white }}>
            <Subheader text="Are you sure?"
              style={{ 
                container: [
                  styles.headerContainer,
                  isAssets ? styles.assetsBackground : styles.liabilitiesBackground
                ],
                text: styles.headerText 
              }} />
              <Divider />
              <Button accent text={`Delete ${isAssets ? 'Asset' : 'Liability'}`} 
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

export default DeleteModal