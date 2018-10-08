import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import SdStorage from '@material-ui/icons/SdStorage'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  stat: {
    display: 'flex'
  }
})

class ActionFooter extends Component {

  render() {
    const {classes, avgCpu, avgNet} = this.props

    return (
      <CardActions className={classes.actions} disableActionSpacing>
        <div className={classes.stat}>
          <FlashOnIcon />
          <Typography component="p">
            {avgCpu}
          </Typography>
        </div>
        <div className={classes.stat}>
          <SdStorage />
          <Typography component="p">
            {avgNet}
          </Typography>
        </div>
      </CardActions>
    )
  }
}

export default withStyles(styles)(ActionFooter)