import uuid from 'uuid/v4'
import omit from 'lodash/omit'
import update from 'immutability-helper'

const assets = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ASSET':
      return update (
        state, {
          [action.itemId]: { $set: asset(state[action.itemId], action) }
        }
      )
    case 'ADD_ASSET':
      return update (
        state, {
          [action.itemId]: { $set: asset(undefined, action) }
        }
      )
    case 'DELETE_ASSET':
      return omit(state, action.itemId)
    case 'RENAME_ASSET':
      return update (
        state, {
          [action.itemId]: { $set: asset(state[action.itemId], action) }
        }
      )
    case 'UPDATE_ASSET_HISTORY':
      return update (
        state, {
          [action.itemId]: { $set: asset(state[action.itemId], action) }
        }
      )
    case 'REMOVE_ASSET_HISTORY':
      return update (
        state, {
          [action.itemId]: { $set: asset(state[action.itemId], action) }
        }
      )
    default: return state
  }
}

const asset = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ASSET':
      return update (state, {
        $set: {
          ...state,
          amount: action.amount,
          updated: new Date(),
          history: [].concat([{
            id: uuid(),
            updated: action.date,
            amount: action.amount,
            created: false
          }], state.history)
        }
      })
    case 'ADD_ASSET':
      return update (state, {
        $set: {
          id: action.itemId,
          name: action.name,
          amount: action.amount,
          updated: new Date(),
          history: [{
            id: uuid(),
            updated: new Date(),
            amount: action.amount,
            created: true
          }]
        }
      })
    case 'RENAME_ASSET':
      return {
        ...state,
        name: action.name
      }
    case 'UPDATE_ASSET_HISTORY':
      const newHistory = state.history.map(account => {
        if (account.id === action.historyId) return { id: uuid(), amount: action.amount, updated: action.date }
        return account
      })

      return update (
        state, {
          history: {
            $set: newHistory
          }
        }
      )
    case 'REMOVE_ASSET_HISTORY':
      return {
        ...state,
        history: state.history.filter(account => account.id !== action.historyId)
      }
    default: return state
  }
}

module.exports = assets