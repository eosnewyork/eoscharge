import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import SearchInput from './SearchInput'
import InputLabel from '@material-ui/core/InputLabel'
import { inject, observer } from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import { withNamespaces } from 'react-i18next'

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
})

class AllActionsForm extends Component {

  handleFilterChange = value => {
    this.props.actionStore.setFilter(value)
  }

  render() {
    const {actionStore, classes, t} = this.props
    
    return (
      <React.Fragment>
        {actionStore.isLoaded &&
        <div>  
          
          <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
            {t('ACTION_SEARCH')}
          </Typography>
          <Typography variant="title" align="center" color="textSecondary" paragraph>
            {t('TYPE_DAPP_ACCT_NAME')}
          </Typography>

          <div className={classes.form}>
            <FormControl margin="none" required fullWidth>
              <InputLabel htmlFor="filter">{t('SEARCH')}</InputLabel>
              <SearchInput id="filter" 
                      value={actionStore.filter}
                      placeholder="Ex: eosio"
                      onChange={this.handleFilterChange} />
            </FormControl>
          </div>
        </div>}
      </React.Fragment>
    )
  }
}

export default 
withNamespaces()(
  inject('actionStore')(
    withStyles(styles)(
      observer(
        AllActionsForm
      )
    )
  )
)