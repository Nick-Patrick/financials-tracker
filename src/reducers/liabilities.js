import uuid from 'uuid/v4'
import omit from 'lodash/omit'

const LIABILITYs = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LIABILITY':
      return Object.assign({}, state, {
        [action.itemId]: LIABILITY(state[action.itemId], action)
      })
    case 'ADD_LIABILITY':
      return Object.assign({}, state, {
        [action.itemId]: LIABILITY(undefined, action)
      })
    case 'DELETE_LIABILITY':
      return omit(state, action.itemId)
    case 'RENAME_LIABILITY':
      return Object.assign({}, state, {
        [action.itemId]: LIABILITY(state[action.itemId], action)
      })
    case 'UPDATE_LIABILITY_HISTORY':
      return Object.assign({}, state, {
        [action.itemId]: LIABILITY(state[action.itemId], action)
      })
    default: return state
  }
}

const LIABILITY = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LIABILITY':
      return Object.assign({}, state, {
        amount: action.amount,
        updated: new Date(),
        history: [].concat([{
          id: uuid(),
          updated: action.date,
          amount: action.amount,
          created: false
        }], state.history)
      })
    case 'ADD_LIABILITY':
      return {
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
    case 'RENAME_LIABILITY':
      return Object.assign({}, state, {
        name: action.name
      })
    case 'UPDATE_LIABILITY_HISTORY':
      return Object.assign({}, state, {
        history: state.history.map(account => {
          if (account.id === action.historyId) return { id: uuid(), amount: action.amount, updated: action.date }

          return account
        })
      })
    default: return state
  }
}

module.exports = LIABILITYs