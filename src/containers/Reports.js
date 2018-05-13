import React, { Component } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { COLOR, ThemeProvider, BottomNavigation, ActionButton, ListItem, Subheader } from 'react-native-material-ui'
import { connect } from 'react-redux'
import ReportsHeader from '../components/reportsHeader'

const uiTheme = {
  palette: {
    primaryColor: COLOR.teal400,
  }
}

const navStyle = {
    navBarBackgroundColor: COLOR.cyan600,
    statusBarColor: COLOR.cyan700,
    navigationBarColor: COLOR.cyan700,
    tabBarSelectedButtonColor: COLOR.cyan700  
  }

class ReportsContainer extends Component {
  static navigatorStyle = navStyle

  constructor(props) {
    super(props)
  }

  render() {
    const { assets, liabilities } = this.props

    return (
      <ThemeProvider style={{ flex: 1 }} uiTheme={uiTheme}>
        <View style={{ flex: 1 }}>
          <ReportsHeader assets={assets} liabilities={liabilities} />
        </View>
      </ThemeProvider>
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

export default connect(mapStateToProps)(ReportsContainer)