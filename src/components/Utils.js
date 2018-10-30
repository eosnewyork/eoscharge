import i18n from '../i18n'

class Utils {

  computeCount = (avail, cost) => {
    return Math.floor(avail/cost)
  }

  formatQuantity = (resource, type) => {
    if(type === 'cpu') {
      return Math.round(resource).toLocaleString() + ' µs'
    } 
    else if(type === 'net') {
      return Math.round(resource / 1024).toLocaleString() + ' KiB'
    }
    else if(type === 'words') {
      return Math.round(resource * 8).toLocaleString() + ' Bytes'
    }
  }

  createTopMarkup = (avgCpu, avgNet, actionName, actionAcct) => {
    const html = i18n.t('ACTION_TOP', { actionName: actionName, actionAcct: actionAcct, avgCpu: avgCpu, avgNet: avgNet})
    return {__html: html}
  }

  createBottomMarkup = (actionName, count) => {
    const html = i18n.t('ACTION_BOTTOM', { actionName: actionName, count: count})
    return {__html: html}
  }

  badgeCount = count => {
    return count > 999 ? "999⁺" : count
  }
}

const utils = new Utils()
export default utils
