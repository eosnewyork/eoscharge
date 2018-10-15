import React, { Component } from 'react'
import Action from '../components/Action'
import Grid from '@material-ui/core/Grid'
import { inject, observer } from 'mobx-react'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: theme.spacing.unit * 4,
    alignItems: 'center'
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
})

class AllActions extends Component {
  componentDidMount() {
    
  }

  componentWillReact() {
    
  }

  handleBack = () => {
    this.props.actionStore.prevPage()
  }

  handleNext = () => {
    this.props.actionStore.nextPage()
  }

  render() {
    const {actionStore, acctStore, classes} = this.props
    
    return (
      <React.Fragment>
        {actionStore.isLoaded &&
        <div>

          <Grid container spacing={40}>
            {actionStore.pagedSortedList.map((action, i) => (
              <Grid item key={action.uniqueId} sm={6} md={4} lg={3}>
                <Action action={action} availCpu={acctStore.account.cpu_limit.available} />
              </Grid>
            ))}
          </Grid>

          {actionStore.sortedList.length > 0 ? 

            <div className={classes.buttons}>
              <Typography variant="body1" color="textSecondary">
                {actionStore.startIdx + 1} - {actionStore.endIdx} of {actionStore.sortedList.length}
              </Typography>

              <div>
              <Button disabled={actionStore.startIdx === 0} onClick={this.handleBack} className={classes.button}>
                Back
              </Button>
            
              <Button disabled={actionStore.endIdx === actionStore.sortedList.length}
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                className={classes.button}>
                Next
              </Button>
              </div>
            </div>
            
            : 
            
            <Typography variant="title" align="center" color="textSecondary" paragraph>
              No actions found containing "{actionStore.filter}"
            </Typography>
          }
        
        </div>}
      </React.Fragment>
    )
  }
}

export default inject('actionStore', 'acctStore')(withStyles(styles)(observer(AllActions)))