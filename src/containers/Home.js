import React, { Component } from 'react'
import classNames from 'classnames'
import Account from './Account'
import withStyles from '@material-ui/core/styles/withStyles'
import ActionStore from '../stores/ActionStore'
import AccountStore from '../stores/AccountStore'
import PopularActions from './PopularActions'
import AllActions from './AllActions'
import AllActionsForm from './AllActionsForm'
import { Provider } from 'mobx-react'

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  heroButtons: {
    marginTop: theme.spacing.unit * 4,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  popularCardGrid: {
    padding: `${theme.spacing.unit * 8}px 0`,
  },
  allCardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
  }
})

class Home extends Component {
  render() {
    const {classes} = this.props
    
    return (      
      <div>
        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Account />            
          </div>
        </div>
        <div className={classNames(classes.layout, classes.popularCardGrid)}>
          <Provider actionStore={ActionStore} acctStore={AccountStore}>
            <PopularActions />
          </Provider>
        </div>
        
        <div className={classes.heroUnit} id="all-actions">
          <div className={classes.heroContent}>
            <Provider actionStore={ActionStore}>
              <AllActionsForm />
            </Provider>  
          </div>
          <div className={classNames(classes.layout, classes.allCardGrid)}>
            <Provider actionStore={ActionStore} acctStore={AccountStore}>
              <AllActions />
            </Provider>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Home)