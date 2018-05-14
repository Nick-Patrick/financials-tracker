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
    return {
      type: isAssets ? 'UPDATE_ASSET' : 'UPDATE_LIABILITY',
      itemId: account.id,
      amount: account.amount
    }
  },

  deleteAccountAction (isAssets, account) {
    return {
      type: isAssets ? 'DELETE_ASSET' : 'DELETE_LIABILITY',
      itemId: account.id
    }
  },

  renameAccountAction (isAssets, account, newName) {
    return {
      type: isAssets ? 'RENAME_ASSET' : 'RENAME_LIABILITY',
      itemId: account.id,
      name: newName
    }
  }

}

module.exports = accounts