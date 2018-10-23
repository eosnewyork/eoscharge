import React, { Component } from 'react'
import { Provider } from "mobx-react"
import AccountStore from '../stores/AccountStore'
import AccountForm from './AccountForm'
import AccountResources from './AccountResources'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  heroButtons: {
    marginTop: theme.spacing.unit * 4
  },
  acctWrapper: {
    marginBottom: theme.spacing.unit * 8
  }
})

class Account extends Component {  

  render() {
    const {classes} = this.props

    return (
      <div className={classes.acctWrapper}>
        <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
          Take Charge of Your Account
        </Typography>
        <Typography variant="title" align="center" color="textSecondary" paragraph>
          Enter your EOS Account below to receive a custom report of how many actions you can perform on the EOS Mainnet
        </Typography>
        <div className={classes.heroButtons}>
          <Provider store={AccountStore}>
            <AccountForm />
          </Provider>
          <Provider store={AccountStore}>
            <AccountResources />
          </Provider>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Account)
