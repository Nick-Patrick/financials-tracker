import { Navigation } from 'react-native-navigation'
import { registerScreens } from './src/screens'
import { Provider } from 'react-redux'
import configureStore from './src/store/configureStore'
import initialState from './src/utils/initialState' 
import { persistStore } from 'redux-persist'

const store = configureStore({})

persistStore(store, null, () => {
  registerScreens(store, Provider)

  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Assets',
        screen: 'networth.Assets',
        navigatorStyle,
        navigatorButtons,
        icon: require('./src/images/ic_assets.png'),
        title: 'Assets'
      },
      {
        label: 'Liabilities',
        screen: 'networth.Liabilities',
        navigatorStyle,
        navigatorButtons,
        icon: require('./src/images/ic_debt.png'),
        title: 'Liabilities'
      },
      {
        label: 'Reports',
        screen: 'networth.Reports',
        navigatorStyle,
        navigatorButtons,
        icon: require('./src/images/ic_reports.png'),
        title: 'Reports'
      },
    ],
    appStyle: {
      forceTitlesDisplay: true
    },
    animationType: 'slide-down'
  })
})

const navigatorStyle = {
	statusBarTextColorScheme: 'light',
	navBarTextColor: 'white',
  navBarComponentAlignment: 'center',
	navBarButtonColor: '#fff',
	tabBarButtonColor: 'black',
  tabBarSelectedFontWeight: '900',
	tabBarBackgroundColor: 'white',
	topBarElevationShadowEnabled: true,
  navBarTextFontSize: 21,
  navBarButtonFontSize: 24,
  navBarTitleTextCentered: true,
  navBarSubTitleTextCentered: true
};

const navigatorButtons = {
  rightButtons: [
    {
      title: 'Set Time Period',
      id: 'editTimePeriod',
      showAsAction: 'never'
    },
    {
      title: 'Set Currency', 
      id: 'editCurrency',
      showAsAction: 'never'
    }
  ]
}
