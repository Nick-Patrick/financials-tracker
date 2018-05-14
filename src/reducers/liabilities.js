import uuid from 'uuid/v4'
import omit from 'lodash/omit'

const assets = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LIABILITY':
      return Object.assign({}, state, {
        [action.itemId]: asset(state[action.itemId], action)
      })
    case 'ADD_LIABILITY':
      return Object.assign({}, state, {
        [action.itemId]: asset(undefined, action)
      })
    case 'DELETE_LIABILITY':
      return omit(state, action.itemId)
    default: return state
  }
}

const asset = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LIABILITY':
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
    default: return state
  }
}

module.exports = assets