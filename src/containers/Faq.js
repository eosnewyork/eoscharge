import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

//import FaqStore from "../stores/FaqStore'
//import { inject, observer, Provider } from 'mobx-react'

const styles = theme => ({
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  layout: {
    width: 'auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  }
})

class Faq extends Component {
  componentDidMount() {
    //this.props.faqStore.loadFaqs()    
  }

  render() {
    const {classes} = this.props
    
    return (      
      <div className={classes.heroUnit}>
        <div className={classes.layout}>
          
          <Typography variant="display1" gutterBottom>
            Q1. EOS Charge is reporting that a particular action will take X microseconds of CPU resources, but in my experience it sometimes takes more or less.
          </Typography>
          <Typography variant="subheading">
            EOS Charges utilizes an average cost for the transaction across all active Block Producers. EOS Charge does this by a database query script that averages the CPU usage for all actions of a certain type across all Block Producers. Since Block Producers have varying levels of performance a Block Producer will process a transaction differently, as users will observe more or less actual CPU usage reported.
          </Typography>

          <Typography variant="display1" style={{paddingTop: 30}} gutterBottom>
            Q2. When looking at my account resources this morning, I had 100% of my CPU resources.  This afternoon when I checked, I only have 50% available and I haven’t authorized any transactions since.
          </Typography>
          <Typography variant="subheading">
            The value is computed using the account’s available resource balance divided by the account’s max resource allowance (which is determined by the amount of EOS staked towards that resource). Due to network conditions, the max value reported by the API sometimes changes dramatically throughout the day.  Don’t fear; your available balance remains unchanged.
          </Typography>

          <Typography variant="display1" style={{paddingTop: 30}} gutterBottom>
            Q3. I haven’t used my account to perform an action in over a week, but my charge is still at 50%.  What gives?
          </Typography>
          <Typography variant="subheading">
            The EOS state database only performs the resource availability calculations for each account at the time when a transaction is being processed for that account.  There is no ongoing process to keep all account resource availability up to date.  If you perform a simple action with your account, you should see your charge jump up close to 100%.
          </Typography>
          
          

        </div>
      </div>      
    )
  }
}

//export default inject('faqStore')(withStyles(styles)(observer(Home)))
export default withStyles(styles)(Faq)