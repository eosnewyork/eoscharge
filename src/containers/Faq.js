import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
//import FaqStore from "../stores/FaqStore'
//import { inject, observer, Provider } from 'mobx-react'

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

class Faq extends Component {
  componentDidMount() {
    //this.props.faqStore.loadFaqs()    
  }

  render() {
    const {classes} = this.props
    
    return (      
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <ul>
            <li>
              Question 1
            </li>
            <li>
              Question 2
            </li>
          </ul>
        </div>
      </div>      
    )
  }
}

//export default inject('faqStore')(withStyles(styles)(observer(Home)))
export default withStyles(styles)(Faq)