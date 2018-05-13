import uuid from 'uuid/v4'

const assets = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_LIABILITY':
      return Object.assign({}, state, {
        [action.itemId]: asset(undefined, action)
      })
    default: return state
  }
}

const asset = (state = {}, action) => {
  switch (action.type) {
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