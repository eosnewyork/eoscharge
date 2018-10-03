import {observable, action, decorate} from 'mobx'
import Cookies from 'universal-cookie'

const cookies = new Cookies();

const defaultAccount = {
  net_limit: {used: 100, available: 0, max: 100},
  cpu_limit: {used: 100, available: 0, max: 100}
}

class AccountStore {
  
  constructor() {
    this.account = defaultAccount
    this.state = 'init'
    this.error = null
    this.accountName = cookies.get('account-name') || ""

    if(this.accountName.length > 0) {
      this.loadAccount()
    }
  }

  setState = state => {
    this.state = state
  }

  setAccountName = name => {
    this.accountName = name.trim().toLowerCase()
    this.setState('init')
  }

  setAccount = data => {
    this.account = data
    cookies.set('account-name', this.accountName, { path: '/' })
  }

  setError = error => {
    this.error = error
  }

  handleError = error => {
    this.setError(error)
    this.setState('error')
    this.setAccount(defaultAccount)
    cookies.remove('account-name')
  }

  loadAccount = name => {
    this.setState('pending')
    
    fetch('https://api.eosnewyork.io/v1/chain/get_account', {
      method: 'post',
      body: JSON.stringify({'account_name': this.accountName})
    })
      .then(response => {

        if (response.status === 500) {
          throw Error(`Account ${this.accountName} not found.`);
        }
        
        return response.json()
      })
      .then(this.setAccount)
      .then(() => {this.setState('done')})
      .catch(this.handleError)
  }
}

decorate(AccountStore, {
  account: observable,
  state: observable,
  error: observable,
  accountName: observable,
  setAccountName: action,
  setState: action,
  setError: action,
  setAccount: action,
})

const store = new AccountStore()
export default store