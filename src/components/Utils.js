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

  createMarkup = (cpu, count, desc) => {
    const html = desc.replace('$AVAIL_CPU', cpu).replace('$COUNT', count.toLocaleString())
    return {__html: html};
  }

  badgeCount = count => {
    return count > 999 ? "999⁺" : count
  }
}

const utils = new Utils()
export default utils