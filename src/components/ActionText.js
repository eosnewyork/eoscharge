import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  description: {
    marginTop: theme.spacing.unit * 2
  },
  title: {
    '& a': {
      color: theme.palette.text.primary,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
})

class ActionText extends Component {

  render() {
    const {acctName, title, subtitle, topText, bottomText, classes} = this.props
    
    return (
      <React.Fragment>
        <Typography variant="display1" color="textPrimary" className={classes.title}>
          <a target="_blank" rel="noopener noreferrer" href={`https://bloks.io/account/${acctName}`}>{title}</a>
        </Typography>
        <Typography variant="title" color="textSecondary">
          {subtitle}
        </Typography>
        <Typography className={classes.description} variant="body1" dangerouslySetInnerHTML={topText}>
        </Typography>
        <Typography className={classes.description} variant="body1" dangerouslySetInnerHTML={bottomText}>
        </Typography>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ActionText)
