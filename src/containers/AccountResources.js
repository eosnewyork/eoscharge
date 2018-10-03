import React, {Component} from 'react'
import Battery from '../components/Battery'
import {inject, observer} from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Collapse from '@material-ui/core/Collapse';


const styles = theme => ({
  batteryRoot: {
    flexGrow: 1,
    marginTop: theme.spacing.unit * 3
  }
})

class AccountResources extends Component {
  componentWillReact() {
    console.log("AccountResources will rerender")
  }

  render() {
    const {store} = this.props
    const {classes} = this.props

    return (
      <Collapse in={['done'].includes(store.state)}>        
          <Grid container className={classes.batteryRoot} spacing={16} justify="center">
            <Grid item>
              <Battery type="net" available={store.account.net_limit.available} max={store.account.net_limit.max} />
            </Grid>
            <Grid item>
              <Battery type="cpu" available={store.account.cpu_limit.available} max={store.account.cpu_limit.max} />
            </Grid>
          </Grid>
      </Collapse>          
    )
  }
}

export default inject('store')(withStyles(styles)(observer(AccountResources)))