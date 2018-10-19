import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'

const styles = theme => ({
  footer: {
    padding: theme.spacing.unit * 6,
    textAlign: 'center',
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  footerLogo: {
    height: 60,
    width: 60,
    marginBottom: theme.spacing.unit * 2
  },
  disclaimer: {
    marginTop: theme.spacing.unit * 2
  },
})

class Footer extends Component {
  render() {
    const {classes} = this.props
    
    return (
      <footer className={classes.footer} aligh="center">
        <img className={classes.footerLogo} src="./images/EOS-NY_logo.svg" align="center" alt="EOS New York logo" />
        <Typography variant="subheading" align="center" color="textSecondary">
          Made with <span role="img" aria-label="heart" aria-labelledby="heart">❤️</span> by <a target="_blank" rel="noopener noreferrer" href="https://www.eosnewyork.io/">EOS New York</a>
        </Typography>
        <Typography>
          <Link to="/disclaimer">Disclaimer</Link>
        </Typography>
      </footer>    
    )
  }
}

export default withStyles(styles)(Footer)