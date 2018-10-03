import {observable, action, decorate, computed} from 'mobx'

class ActionStore {
  actions = []
  isLoaded = false
  blacklist = ['foobar']
  startIdx = 0
  pageSize = 20
  popContent = {
    'monstereosio:feedpet': {
      img: 'monster-105.png',
      title: 'MonsterEOS', 
      subtitle: 'Feed Pet',
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to feed your pet <strong>$COUNT</strong> times in the next 72 hours.'
    },
    'eosbetdice11:resolvebet': {
      img: 'eosbet-logo-textside-azure.png',
      title: 'EOSBET', 
      subtitle: 'Resolve Bet',
      description: 'Using your <strong>$AVAIL_CPU</strong> worth of CPU, you are able to resolve <strong>$COUNT</strong> bets in the next 72 hours.'
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
    }
  }
  filter = ''

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
      const additionalProps = {'uniqueId': `${action._id.acct}:${action._id.name}` }
      return {...action, ...additionalProps}
    })
    this.isLoaded = true;
  }

  setFilter = filter => {
    this.filter = filter.trim().toLowerCase()
    this.startIdx = 0
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
      console.log(action)
      return action.uniqueId in this.popContent
    }).map(action => {
      const popContent = this.popContent[action.uniqueId]
      return {...action, ...popContent}
    })

    console.log(popularActions.length)

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