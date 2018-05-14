import uuid from 'uuid/v4'
import omit from 'lodash/omit'

const assets = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ASSET':
      return Object.assign({}, state, {
        [action.itemId]: asset(state[action.itemId], action)
      })
    case 'ADD_ASSET':
      return Object.assign({}, state, {
        [action.itemId]: asset(undefined, action)
      })
    case 'DELETE_ASSET':
      return omit(state, action.itemId)
    case 'RENAME_ASSET':
      return Object.assign({}, state, {
        [action.itemId]: asset(state[action.itemId], action)
      })
    default: return state
  }
}

const asset = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_ASSET':
      return Object.assign({}, state, {
        amount: action.amount,
        updated: new Date(),
        history: [].concat([{
          id: uuid(),
          updated: new Date(),
          amount: action.amount,
          created: false
        }], state.history)
      })
    case 'ADD_ASSET':
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
    case 'RENAME_ASSET':
      return Object.assign({}, state, {
        name: action.name
      })
    default: return state
  }
}

module.exports = assets