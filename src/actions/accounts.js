import uuid from 'uuid/v4'

const accounts = {
  addAccountAction (isAssets, account) {
    return {
      type: isAssets ? 'ADD_ASSET' : 'ADD_LIABILITY',
      itemId: uuid(),
      name: account.name,
      amount: account.amount
    }
  },

  updateAccountAction (isAssets, account) {
    console.log('action', isAssets, account.id, account.amount)
    return {
      type: isAssets ? 'UPDATE_ASSET' : 'UPDATE_LIABILITY',
      itemId: account.id,
      amount: account.amount
    }
  }
}

module.exports = accounts