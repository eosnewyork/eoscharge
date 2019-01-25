import { observable, action, decorate } from 'mobx'
import i18n from '../i18n'
import Utils from '../components/Utils'
import { TimeSeries, Index } from 'pondjs'

class ResourceCostStore {
  
  constructor() {
    this.currentCpuPerEOS = null
    this.series = null
    this.avgCpu = null
    this.max = null
    this.min = null
    this.histAvgPresent = null
    this.currentTime = null
    this.network = 'eos'
  }

  setCurrentCpuPerEOS = data => {
    if(!data) {
      this.currentCpuPerEOS = null
      return
    }
    const current = data.cpu_limit.max / (data.cpu_weight / 10000)
    this.currentCpuPerEOS = Utils.formatQuantity(current, 'cpupereos', this.network)
  }

  setCurrentTime = startTime => {
    this.currentTime = '13:01 EST'
    var foo = new Date(startTime)
    var options = { hour12: false, timeZoneName: 'short', hour: '2-digit', minute:'2-digit' };
    this.currentTime = foo.toLocaleTimeString([], options);
  }

  handleError = error => {
    this.setCurrentCpuPerEOS(null)
  }

  setNetwork = network => {
    this.network = network;   
  }

  loadAccount = () => {
    let url = 'https://api.eosnewyork.io/v1/chain/get_account'
    if (this.network === 'bos') {
      url = 'https://api.bos.eosnewyork.io/v1/chain/get_account'
    }

    fetch(url, {
      method: 'post',
      body: JSON.stringify({'account_name': 'eosnewyorkio'})
    })
      .then(response => {

        if (response.status === 500) {
          throw Error(i18n.t('ACCT_NOT_FOUND', { acctName: 'eosnewyorkio'}));
        } else if(!response.ok) {
          throw Error(i18n.t('API_CALL_FAILED'));
        }
        
        return response.json()
      })
      .then(this.setCurrentCpuPerEOS)
      .catch(this.handleError)
  }

  loadCostData = () => {
    const cachebust = (new Date()).getTime()
    let url = `https://www.eossnapshots.io/data/${this.network}charge/rsrc_hourly_latest.json?ts=${cachebust}`
    fetch(url)
      .then(response => response.json())
      .then(data => this.createSeries(data))
  }

  setSeries = series => {
    this.series = series
  }

  setAvgCpu = avgCpu => {
    this.avgCpu = avgCpu
  }

  setMax = max => {
    this.max = max
  }

  setMin = min => {
    this.min = min
  }

  setHistAvgPresent = histAvgPresent => {
    this.histAvgPresent = histAvgPresent
  }

  massageData = (jsonData, startTime) => {
    var data = []
    var tempData = {}
    var utcHour = (new Date(startTime)).getUTCHours()
    
    for(var i = 0; i < jsonData.length; i++) {
      tempData[jsonData[i]._id.hour] = jsonData[i].avg_cpu_per_eos
    }
    
    for(var j = 0; j < 24; j++) {
      var cpu = tempData[(utcHour + j) % 24]
    
      data.push([new Date(startTime + j * 60 * 60 * 1000), cpu])
    }

    return data;
  }

  createSeries = (jsonData) => {
    var startTime = Date.now()
    var data = this.massageData(jsonData, startTime)
    
    var series = new TimeSeries({
      name: "cpu_per_eos",
      columns: ["index", 'cpu'],
      points: data.map(([d, value]) => [Index.getIndexString("1h", d), value])
    })
  
    this.setSeries(series)
    this.setAvgCpu(series.avg('cpu'))
    this.setMax(series.max('cpu'))
    this.setMin(series.min('cpu'))
    this.setHistAvgPresent(Utils.formatQuantity(series.atTime(new Date(startTime)).get('cpu'), 'cpupereos', this.network))
    this.setCurrentTime(startTime)
  }

}

decorate(ResourceCostStore, {
  currentCpuPerEOS: observable,
  error: observable,
  setCurrentCpuPerEOS: action,
  setError: action,
  setSeries: action,
  series: observable,
  isLoaded: observable,
  setAvgCpu: action,
  avgCpu: observable,
  setMax: action,
  max: observable,
  setMin: action,
  min: observable,
  setHistAvgPresent: action,
  histAvgPresent: observable,
  setCurrentTime: action,
  currentTime: observable,
  setNetwork: action
})

const store = new ResourceCostStore()
export default store