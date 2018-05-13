import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { COLOR, ThemeProvider, BottomNavigation, ActionButton, ListItem } from 'react-native-material-ui'
import { connect } from 'react-redux'
import AccountsHeader from '../components/accountsHeader'
import AccountList from '../components/AccountList'

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
  }

  static navigatorStyle = navStyle

  goToAddNewAccount () {
    this.props.navigator.push({
      screen: 'networth.AddAccount',
      title: 'Add New Liability',
      animated: true,
      animationType: 'slide-horizontal',
      navigatorStyle: navStyle,
      passProps: {
        accountType: 'liability'
      }
    })
  }

  render() {
    const { liabilities } = this.props

    return (
      <ThemeProvider uiTheme={uiTheme}>
         <View style={{flex: 1}}>
          <AccountsHeader accountType='liabilites' accounts={liabilities} />
          <AccountList accountType='liabilities' accounts={liabilities} {...this.props} navStyle={navStyle}/>
          <ActionButton
            accountType={'liability'}
            onPress={this.goToAddNewAccount.bind(this)}
            style={{container: {flex: 1, backgroundColor: COLOR.red500} }}
          /> 
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