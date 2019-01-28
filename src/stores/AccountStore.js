import { observable, action, decorate } from 'mobx'
import i18n from '../i18n'
import qs from 'qs'

const defaultAccount = {
  net_limit: {used: 100, available: 0, max: 100},
  cpu_limit: {used: 100, available: 0, max: 100},
  total_resources: {net_weight: "0.0000 EOS", cpu_weight: "0.0000 EOS"}
}

const LS_ACCT_NAME_KEY = 'account-name'
const QS_ACCT_NAME_KEY = 'acct'

class AccountStore {
  
  constructor() {
    this.account = defaultAccount
    this.state = 'init'
    this.error = null
    this.accountName = this.prepopulateAccount()
    this.network = 'eos'
  }

  prepopulateAccount = () => {
    let accountName = localStorage.getItem(LS_ACCT_NAME_KEY) || ''
    
    const params = qs.parse(window.location.search, { ignoreQueryPrefix: true })
    if(params[QS_ACCT_NAME_KEY]) {
      accountName = params[QS_ACCT_NAME_KEY]
    }

    return accountName
  }

  loadPrepopulatedAccount = () => {
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

  setNetwork = network => {
    this.network = network;   
  }

  loadAccount = name => {
    this.setState('pending')
    
    if (this.accountName !== '') {
      let url = 'https://api.eosnewyork.io/v1/chain/get_account'
      if (this.network === 'bos') {
        url = 'https://api.bos.eosnewyork.io/v1/chain/get_account'
      }
      fetch(url, {
        method: 'post',
        body: JSON.stringify({'account_name': this.accountName})
      })
        .then(response => {

          if (response.status === 500) {
            throw Error(i18n.t('ACCT_NOT_FOUND', { acctName: this.accountName}));
          } else if(!response.ok) {
            throw Error(i18n.t('API_CALL_FAILED'));
          }
          
          return response.json()
        })
        .then(this.setAccount)
        .then(() => {this.setState('done')})
        .catch(this.handleError)
    }
    else {
      this.setState('init');
    }
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
  setNetwork: action
})

const store = new AccountStore()
export default store