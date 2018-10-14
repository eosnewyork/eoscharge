import { observable, action, decorate } from 'mobx'

class FaqStore {
  
  constructor() {
    this.faqs = []
    this.state = 'init'
    this.error = null
    
  }

  setState = state => {
    this.state = state
  }

  setFaqs = data => {
    this.faqs = data.objects
  }

  setError = error => {
    this.error = error
  }

  handleError = error => {
    this.setError(error)
    this.setState('error')
  }

  loadFaqs = name => {
    this.setState('pending')
    
    fetch('https://api.cosmicjs.com/v1/eoschargeio/object-type/faqs', {
      method: 'get'
    })
      .then(response => {

        if(!response.ok) {
          throw Error('API call failed. Please try again.');
        }
        
        return response.json()
      })
      .then(this.setFaqs)
      .then(() => {this.setState('done')})
      .catch(this.handleError)
  }
}

decorate(FaqStore, {
  state: observable,
  faqs: observable,
  error: observable,
  setFaqs: action,
  setState: action,
  setError: action
})

const store = new FaqStore()
export default store