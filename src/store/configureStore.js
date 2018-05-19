import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers'
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage'

const persistConfig = {
  key: 'root',
  storage
}

const combinedReducer = persistCombineReducers(persistConfig, rootReducer)


export default function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware
    )
  )

  return createStore(combinedReducer, initialState, enhancer)
}