import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import FaqStore from '../stores/FaqStore'
import { Provider } from 'mobx-react'
import FaqList from './FaqList'
import Typography from '@material-ui/core/Typography'

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
  render() {
    const {classes} = this.props
    
    return (      
      <div className={classes.heroUnit}>
        <div className={classes.layout}>
          
            <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
              Frequently Asked Questions
            </Typography>

          <Provider store={FaqStore}>
            <FaqList />
          </Provider>

        </div>
      </div>      
    )
  }
}

export default withStyles(styles)(Faq)