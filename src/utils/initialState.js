const initialState = {
  assets: {
    1: {
      name: 'Bank Account',
      amount: 1280.00,
      lastUpdated: new Date(),
      history: [{
        created: false,
        updated: new Date(),
        amount: 1130.00
      }, {
        created: false,
        updated: new Date(),
        amount: 1280.00
      }, {
        created: false,
        updated: new Date(),
        amount: 1240.00
      }, {
        created: true,
        updated: new Date(),
        amount: 1000.00
      }]
    }
    // 2: {
    //   name: 'My Second Asset',
    //   amount: 550
    // },
    // 3: {
    //   name: 'My Third Asset',
    //   amount: 1250
    // },
    // 4: {
    //   name: 'My First Asset',
    //   amount: 1000
    // },
    // 5: {
    //   name: 'My Second Asset',
    //   amount: 550
    // },
    // 6: {
    //   name: 'My Third Asset',
    //   amount: 1250
    // },
    // 7: {
    //   name: 'My First Asset',
    //   amount: 1000
    // },
    // 8: {
    //   name: 'My Second Asset',
    //   amount: 550
    // },
    // 9: {
    //   name: 'My Third Asset',
    //   amount: 1250
    // }
  }
}

module.exports = initialState