import React, {Component} from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  description: {
    marginTop: theme.spacing.unit * 2
  }
})

class ActionText extends Component {

  render() {
    const {title, subtitle, description, classes} = this.props
    
    return (
      <React.Fragment>
        <Typography variant="display1" color="textPrimary">
          {title}
        </Typography>
        <Typography variant="title" color="textSecondary">
          {subtitle}
        </Typography>
        <Typography className={classes.description} variant="body1" dangerouslySetInnerHTML={description}>
        </Typography>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(ActionText)