import { combineReducers } from 'redux'
import assets from './assets'
import liabilities from './liabilities'

const rootReducer = combineReducers({
  assets,
  liabilities
})

export default rootReducer