import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import PopularAction from '../components/PopularAction'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { withNamespaces } from 'react-i18next'

const styles = theme => ({
  
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
})

class PopularActions extends Component {
  componentDidMount() {
    this.props.actionStore.loadActions()    
  }

  render() {
    const {actionStore, acctStore, classes, t} = this.props

    return (
      <React.Fragment>
        {actionStore.isLoaded &&
        <div id="popular-actions">
          
          <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
            {t('POPULAR_ACTIONS')}
          </Typography>

          <Grid container spacing={40} className={classes.heroButtons}>
            {actionStore.popularActions.map((action, i) => (
              <Grid item key={action.uniqueId} sm={6} md={4} lg={3}>
                <PopularAction action={action} availCpu={acctStore.account.cpu_limit.available} />
              </Grid>
            ))}
          </Grid>
        
        </div>}
      </React.Fragment>
    )
  }
}

export default 
withNamespaces()(
  inject('actionStore', 'acctStore')(
    withStyles(styles)(
      observer(
        PopularActions
      )
    )
  )
)