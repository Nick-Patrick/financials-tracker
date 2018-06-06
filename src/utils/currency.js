import AsyncStorage from 'AsyncStorage'

class currency {
  currencies = ['$', '£', '€', '₹', '¥']
  
  constructor() {
    try {
      AsyncStorage.getItem('@Currency:index', (err, res) => {
        console.log('here -> ', err, res)
        if (err || !res) this.currencyIndex = 0
        if (res) this.currencyIndex = parseInt(res)
      })
    } catch(e) {
      console.log('catch', e)
      this.currencyIndex = 0
    }
  }

  getCurrency () { return this.currencies[this.currencyIndex] }
  getCurrencyIndex () { return this.currencyIndex }
  setCurrencyIndex (index) { 
    this.currencyIndex = index 
    
    try {
      AsyncStorage.setItem('@Currency:index', index + '')
    } catch (e) {}
  }
}

export default new currency