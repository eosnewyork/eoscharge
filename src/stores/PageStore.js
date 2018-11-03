import { observable, action, decorate, computed } from 'mobx'
import i18n from '../i18n'

class PageStore {
  
  constructor() {
    this.pages = []
    this.state = 'init'
    this.error = null
    this.lng = i18n.language
    this.slug = null

    i18n.on('languageChanged', lng => {
      this.setLng(lng)
    })
  }

  setLng = lng => {
    this.lng = lng
  }

  setSlug = slug => {
    this.slug = slug
  }

  setState = state => {
    this.state = state
  }

  setPages = data => {
    this.pages = data.objects
  }

  get localizedPage() {
    const matchSlug = `${this.lng}-${this.slug}`
    const page = this.pages.find(page => {
      return page.slug === matchSlug
    })
    return page
  }

  setError = error => {
    this.error = error
  }

  handleError = error => {
    this.setError(error)
    this.setState('error')
  }

  loadPages = () => {
    if(this.pages.length > 0) { return }

    this.setState('pending')
    
    fetch('https://api.cosmicjs.com/v1/eosnewyork/object-type/eoscharge-pages', {
      method: 'get'
    })
      .then(response => {

        if(!response.ok) {
          throw Error(i18n.t('API_CALL_FAILED'));
        }
        
        return response.json()
      })
      .then(this.setPages)
      .then(() => {this.setState('done')})
      .catch(this.handleError)
  }
}

decorate(PageStore, {
  state: observable,
  pages: observable,
  lng: observable,
  slug: observable,
  localizedPage: computed,
  error: observable,
  setPages: action,
  setState: action,
  setLng: action,
  setSlug: action,
  setError: action
})

const store = new PageStore()
export default store