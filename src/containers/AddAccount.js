import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddAccount from '../components/AddAccount'

class AddAccountContainer extends Component {
  static navigatorStyle = {
    tabBarHidden: true
  }

  render () { 
    const { dispatch, navigator, accountType } = this.props
    
    return (
      <AddAccount 
        dispatch={dispatch} 
        navigator={navigator}
        accountType={accountType} />
    )
  }
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps)(AddAccountContainer)