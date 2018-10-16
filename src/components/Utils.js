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
    const html = `It costs <b>${avgCpu}</b> of CPU and <b>${avgNet}</b> of NET to perform the <b>&lt;${actionName}&gt;</b> action on <b>${actionAcct}</b>.`
    return {__html: html};
  }

  createBottomMarkup = (actionName, count) => {
    const html = `Based on your account's staked resources, you can <b>&lt;${actionName}&gt;</b> ${count} times over the next 72 hours.`
    return {__html: html};
  }

  badgeCount = count => {
    return count > 999 ? "999⁺" : count
  }
}

const utils = new Utils()
export default utils