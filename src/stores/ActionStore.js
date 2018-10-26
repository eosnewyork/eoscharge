import { observable, action, decorate, computed } from 'mobx'
import queryString from 'query-string'
import createHistory from "history/createBrowserHistory"

class ActionStore {
  history = createHistory()
  actions = []
  isLoaded = false
  blacklist = ['foobar']
  startIdx = 0
  pageSize = 20
  filter = ''
  popContent = {
    'monstereosio:feedpet': {
      img: 'monster-105.png',
      title: 'MonsterEOS', 
      subtitle: 'Feed Pet',
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to feed your pet <strong>$COUNT</strong> times in the next 72 hours.'
    },
    'eosluckydice:luck': {
      img: 'eoswin.jpg',
      title: 'EOS.WIN', 
      subtitle: 'Lucky Draw'
    },
    'eosknightsio:sellmat2': {
      img: 'f1.png',
      title: 'EOS Knights', 
      subtitle: 'Sell Material',
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to sell <strong>$COUNT</strong> materials in the next 72 hours.'
    },
    'pandafuncode:pray': {
      img: 'panda.png',
      title: 'Panda Fun', 
      subtitle: 'Pray',
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to pray <strong>$COUNT</strong> times in the next 72 hours.'
    },
    'eosplaybrand:dicereveal': {
      img: 'eosplay.png',
      title: 'EOSPlay', 
      subtitle: 'Dice Reveal',
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to reveal dice <strong>$COUNT</strong> times in the next 72 hours.'
    },
    'eosio:delegatebw': {
      img: 'eos_logo.png',
      title: 'EOSIO', 
      subtitle: 'Delegate Bandwidth',
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to delegate bandwidth <strong>$COUNT</strong> times in the next 72 hours.'
    },
    'eosio.token:transfer': {
      img: 'eos_logo.png',
      title: 'EOSIO', 
      subtitle: 'Transfer',
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to transfer <strong>$COUNT</strong> times in the next 72 hours.'
    },
    'betdicelucky:draw': {
      img: 'betdice.png',
      title: 'BetDice', 
      subtitle: 'Draw',
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to draw <strong>$COUNT</strong> times in the next 72 hours.'
    },
  }

  loadActions = name => {
    const cachebust = (new Date()).getTime()
    fetch(`https://www.eossnapshots.io/data/eoscharge/latest.json?ts=${cachebust}`)
      .then(response => response.json())
      .then(data => this.setActions(data))
  }

  setActions = actions => {
    this.actions = actions.filter(agg => {
      return !this.blacklist.includes(agg._id.acct)
    }).map(action => {
      const additionalProps = { 'uniqueId': `${action._id.acct}:${action._id.name}` }
      return {...action, ...additionalProps}
    })
    this.isLoaded = true
    this.setFilterFromQuery()
  }

  setFilterFromQuery = () => {
    const query = queryString.parse(window.location.search)
    if(query.filter && query.filter.length > 0) {
      this.setFilter(query.filter)
    } else if (this.filter.length > 0) {
      this.setQueryString(this.filter)
    }
  }

  setQueryString = filter => {
    this.history.push({
      pathname: "/",
      search: filter.length > 0 ? queryString.stringify({filter: filter}) : ''
    })
  }

  setFilter = filter => {
    this.filter = filter.trim().toLowerCase()
    this.startIdx = 0
    this.setQueryString(this.filter)
  }

  nextPage = () => {
    this.startIdx += this.pageSize;
  }

  prevPage = () => {
    this.startIdx -= this.pageSize
  }

  get pagedSortedList() {
    const endIdx = this.startIdx + this.pageSize
    return this.sortedList.slice(this.startIdx, endIdx)
  }

  get endIdx() {
    let endIdx = this.startIdx + this.pageSize
    const sortedList = this.sortedList
    endIdx = endIdx > sortedList.length ? sortedList.length : endIdx
    return endIdx
  }

  get sortedList() {
    const actions = this.actions.filter(action => {
      return this.filter === '' ||
             action._id.acct.indexOf(this.filter) > -1 || 
             action._id.name.indexOf(this.filter) > -1
    })

    actions.sort((a, b) => {
      const compareAccount = a._id.acct.localeCompare(b._id.acct);
      const compareAction = a._id.name.localeCompare(b._id.name);

      return compareAccount || compareAction;
    })
    return actions
  }

  get popularActions() {
    const popularActions = this.actions.filter(action => {
      return action.uniqueId in this.popContent
    }).map(action => {
      const popContent = this.popContent[action.uniqueId]
      return {...action, ...popContent}
    })

    return popularActions
  }
}

decorate(ActionStore, {
  isLoaded: observable,
  setActions: action,
  setFilter: action,
  sortedList: computed,
  pagedSortedList: computed,
  popularActions: computed,
  actions: observable,
  filter: observable,
  startIdx: observable,
  endIdx: computed,
  pageSize: observable,
  nextPage: action,
  prevPage: action
})

const store = new ActionStore()
export default store