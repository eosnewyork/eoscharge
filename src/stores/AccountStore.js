import { observable, action, decorate } from 'mobx'

const defaultAccount = {
  net_limit: {used: 100, available: 0, max: 100},
  cpu_limit: {used: 100, available: 0, max: 100},
  total_resources: {net_weight: "0.0000 EOS", cpu_weight: "0.0000 EOS"}
}

const LS_ACCT_NAME_KEY = 'account-name'

class AccountStore {
  
  constructor() {
    this.account = defaultAccount
    this.state = 'init'
    this.error = null
    this.accountName = localStorage.getItem(LS_ACCT_NAME_KEY) || ""    
  }

  loadSavedAccount = () => {
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
    localStorage.setItem(LS_ACCT_NAME_KEY, this.accountName)
  }

  setError = error => {
    this.error = error
  }

  handleError = error => {
    this.setError(error)
    this.setState('error')
    this.setAccount(defaultAccount)
    localStorage.removeItem(LS_ACCT_NAME_KEY)
  }

  loadAccount = name => {
    this.setState('pending')
    
    fetch('https://api.eosnewyork.io/v1/chain/get_account', {
      method: 'post',
      body: JSON.stringify({'account_name': this.accountName})
    })
      .then(response => {

        if (response.status === 500) {
          throw Error(`Account "${this.accountName}" not found.`);
        } else if(!response.ok) {
          throw Error('API call failed. Please try again.');
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