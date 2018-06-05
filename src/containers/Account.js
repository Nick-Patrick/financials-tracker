import React, { Component } from 'react'
import { connect } from 'react-redux'
import Account from '../components/Account'

class AccountContainer extends Component {
  static navigatorStyle = {
    tabBarHidden: true
  }

  static navigatorButtons = {
    rightButtons: [{
      icon: require('../images/ic_delete.png'),
      id: 'remove'
    }, {
      icon: require('../images/ic_edit.png'),
      id: 'edit'
    }]
  }

  render () {        
    return (
      <Account 
        {...this.props} 
        currentAccount={ this.props.isAssets ? this.props.assets[this.props.account.id] : this.props.liabilities[this.props.account.id] } 
      />
    )
  }
}

function mapStateToProps(state) {
  const { assets, liabilities } = state
  return {
    assets,
    liabilities
  }
}

export default connect(mapStateToProps)(AccountContainer)