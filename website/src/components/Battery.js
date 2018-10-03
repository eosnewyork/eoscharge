import React, {Component} from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Utils from './Utils'

const styles = theme => ({
  wrapper: {
    width: 130
  },
  batteryContainer: {
    position: 'relative',
    //height: '100%',
    display: 'inline-block',
    //alignItems: 'center',
    //justifyContent: 'center',
    //flexDirection: 'column',
    textAlign: 'center'
  },
  graphic: {
    //height: '100%'
    width: '100%',
    //position: 'relative'
  },
  pctLabel: {
    //position: 'absolute',
    top: '40%',
    width: '100%',
    position: 'absolute',
    color: 'white',
    fontSize: '1.3rem',
    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)'
  }
})

class Battery extends Component {
  
  createSvgPath = pct => {
    var max = 5.5
    var min = 20.5
    var minv = 0.17

    var delta = (min - max) * (pct/100) 
    var var1 = min - delta;
    var var2 = minv + delta;
    return `M7 ${var1}v${var2}C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V${var1}H7z`
  }

  shouldComponentUpdate(nextProps) {
    return (
      nextProps.type !== this.props.type ||
      nextProps.available !== this.props.available ||
      nextProps.max !== this.props.max
    )
  }

  render() {
    const {classes, type, available, max} = this.props
    const pct = Math.round(available / max * 100)
    const svgPath = this.createSvgPath(pct)
    const qty = Utils.formatQuantity(available, type)

    let color = pct > 20 ? 'green' : 'red'
    console.log('battery rendering')
    return ( 
      <div className={classes.wrapper}>
        <Typography variant="title" align="center">{this.props.type.toUpperCase()}</Typography>
        <div className={classes.batteryContainer} align="center">
          <svg focusable="false" viewBox="0 0 24 24" className={classes.graphic}>
            <path fillOpacity="0.3" d="M17 5.33C17 4.6 16.4 4 15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33V20.5h10V5.33z"></path>
            <path d={svgPath} fill={color}></path>
            <path fill="none" d="M0 0h24v24H0z"></path>            
          </svg>
          
          <Typography className={classes.pctLabel} variant="body2" align="center">{`${pct}%`}</Typography>
        </div>
        <Typography variant="body1" align="center">{`${qty}`}</Typography>
      </div>
    )
  }
}

export default withStyles(styles)(Battery)