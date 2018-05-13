import { Navigation } from 'react-native-navigation'

import AssetsContainer from './containers/Assets'
import LiabilitiesContainer from './containers/Liabilities'
import ReportsContainer from './containers/Reports'
import AccountContainer from './containers/Account'

export function registerScreens (store, Provider) {
  Navigation.registerComponent('networth.Assets', () => AssetsContainer, store, Provider)
  Navigation.registerComponent('networth.Liabilities', () => LiabilitiesContainer, store, Provider)
  Navigation.registerComponent('networth.Reports', () => ReportsContainer, store, Provider),
  Navigation.registerComponent('networth.Account', () => AccountContainer, store, Provider)
}