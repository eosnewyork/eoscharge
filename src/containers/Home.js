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
import Questions from './Questions'
import ResourceCostChart from './ResourceCostChart'
import ResourceCostStore from '../stores/ResourceCostStore'
import { withNamespaces } from 'react-i18next'
import { EOS_NETWORK } from '../config.js';

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
    paddingBottom: theme.spacing.unit * 14,
    marginTop: theme.spacing.unit * 6
  },
  resourceCostChart: {
    paddingTop: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 24,
    marginTop: theme.spacing.unit * 6
  },
  allCardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
  },
  allActionsForm: {
    
  },
  home: {
    position: 'relative'
  },
  splitScreen: {
    background: 'linear-gradient(180deg, #FFFFFF 50%, #ededed 50%)'
  }
})

class Home extends Component {

  render() {
    const {classes} = this.props
    let popularDiv = <div className={classNames(classes.layout, classes.popularCardGrid)}>
        <Provider actionStore={ActionStore} acctStore={AccountStore}>
          <PopularActions />
        </Provider>
      </div>

    if (this.props.network !== EOS_NETWORK) {
      popularDiv = <div></div>
    }

    return (      
      <div className={classes.home}>
        
        <Questions />

        <div className={classes.heroUnit}>
          <div className={classes.heroContent}>
            <Account network={this.props.network}/>
          </div>
        </div>
        
        <div className={classes.splitScreen}>
          <Provider store={ResourceCostStore}>
            <ResourceCostChart network={this.props.network}/>
          </Provider>
        </div>
        
        {popularDiv}

        <div className={classes.heroUnit} id="all-actions">
          <div className={classNames(classes.heroContent, classes.allActionsForm)}> 
            <Provider actionStore={ActionStore}>
              <AllActionsForm network={this.props.network}/>
            </Provider>  
          </div>
          <div className={classNames(classes.layout, classes.allCardGrid)}>
            <Provider actionStore={ActionStore} acctStore={AccountStore} >
              <AllActions network={this.props.network}/>
            </Provider>
          </div>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(withStyles(styles)(Home))