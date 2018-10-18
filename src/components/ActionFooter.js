import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import DeveloperBoardIcon from '@material-ui/icons/DeveloperBoard'
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'

const styles = theme => ({
  actions: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& p': {
      paddingLeft: theme.spacing.unit / 2
    }
  }
})

class ActionFooter extends Component {

  render() {
    const {classes, avgCpu, avgNet} = this.props

    return (
      <CardActions className={classes.actions} disableActionSpacing>
        <div className={classes.stat}>
          <DeveloperBoardIcon />
          <Typography component="p">
            {avgCpu}
          </Typography>
        </div>
        <div className={classes.stat}>
          <NetworkCheckIcon />
          <Typography component="p">
            {avgNet}
          </Typography>
        </div>
      </CardActions>
    )
  }
}

export default withStyles(styles)(ActionFooter)
