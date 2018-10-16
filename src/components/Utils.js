class Utils {

  computeCount = (avail, cost) => {
    return Math.round(avail/cost)
  }

  formatQuantity = (resource, type) => {
    if(type === 'cpu') {
      return Math.round(resource).toLocaleString() + ' µs'
    } 
    else if(type === 'net') {
      return Math.round(resource / 1024).toLocaleString() + ' KiB'
    }
    else if(type === 'words') {
      return Math.round(resource / 8).toLocaleString() + ' Bytes'
    }
  }

  createTopMarkup = (avgCpu, avgNet, actionName, actionAcct) => {
    const html = `The <b>&lt;${actionName}&gt;</b> action on <b>${actionAcct}</b> costs <b>${avgCpu}</b> of CPU and <b>${avgNet}</b> of NET.`
    return {__html: html}
  }

  createBottomMarkup = (actionName, count) => {
    const html = `You can <b>&lt;${actionName}&gt; ${count} times</b> over the next 72 hours based on your account's staked resources.`
    return {__html: html}
  }

  badgeCount = count => {
    return count > 999 ? "999⁺" : count
  }
}

const utils = new Utils()
export default utils
