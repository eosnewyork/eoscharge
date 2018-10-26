import { observable, action, decorate, computed } from 'mobx'
import i18n from '../i18n'

class FaqStore {
  
  constructor() {
    this.faqs = []
    this.state = 'init'
    this.error = null
    this.lng = i18n.language

    i18n.on('languageChanged', lng => {
      this.setLng(lng)
    })
  }

  setLng = lng => {
    this.lng = lng
  }

  setState = state => {
    this.state = state
  }

  setFaqs = data => {
    this.faqs = data.objects
  }

  get localizedFaqs() {
    const faqs = this.faqs.filter(faq => {
      //return faq.slug.split('-')[0] === this.lng
      return faq.slug.split('-')[0] === 'en'
    })
    
    return faqs
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
    
    fetch('https://api.cosmicjs.com/v1/eosnewyork/object-type/eoscharge-faqs', {
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
  lng: observable,
  localizedFaqs: computed,
  error: observable,
  setFaqs: action,
  setState: action,
  setLng: action,
  setError: action
})

const store = new FaqStore()
export default store