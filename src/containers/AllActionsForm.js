import React, {Component} from 'react'
import FormControl from '@material-ui/core/FormControl'
import SearchInput from './SearchInput'
import InputLabel from '@material-ui/core/InputLabel'
import {inject, observer} from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography'


const styles = theme => ({
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
})

class AllActionsForm extends Component {

  handleFilterChange = value => {
    this.props.actionStore.setFilter(value)
  }

  render() {
    const {actionStore, classes} = this.props
    
    return (
      <React.Fragment>
        {actionStore.isLoaded &&
        <div>  
          
          <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
            Action Search
          </Typography>
          <Typography variant="title" align="center" color="textSecondary" paragraph>
            Type a dApp account name or action name below to filter the list of actions
          </Typography>

          <div className={classes.heroButtons}>
            <FormControl margin="none" required fullWidth>
              <InputLabel htmlFor="filter">Search</InputLabel>
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

export default inject('actionStore')(withStyles(styles)(observer(AllActionsForm)))