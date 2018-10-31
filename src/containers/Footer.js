import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

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
    const {classes, t} = this.props
    
    return (
      <footer className={classes.footer} aligh="center">
        <img className={classes.footerLogo} src="./images/EOS-NY_logo.svg" align="center" alt="EOS New York logo" />
        <Typography variant="subheading" align="center" color="textSecondary" gutterBottom dangerouslySetInnerHTML={{__html: t('MADE_WITH_LOVE')}}></Typography>
        <Typography>
          <Link to="/disclaimer">{t('DISCLAIMER')}</Link>
        </Typography>
      </footer>    
    )
  }
}

export default 
withNamespaces()(
  withStyles(styles)(
    Footer
  )
)
