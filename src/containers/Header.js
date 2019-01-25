import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import HeaderNavMenu from './HeaderNavMenu'
import HeaderLangMenu from './HeaderLangMenu'
import HeaderNetworkMenu from './HeaderNetworkMenu'
import { Link } from 'react-router-dom'
import { withNamespaces } from 'react-i18next'

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  toolbar: {
    height: theme.spacing.unit * 8
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  title: {
    flexGrow: 1,
    '& a': {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  button: {
    backgroundColor: theme.palette.background.default,
  },
  buttonText: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.primary.main,
    fontWeight: 700,
    [theme.breakpoints.down('xs')]: {
      display: 'none'
    },
  },
  headerLogo: {
    height: theme.spacing.unit * 4
  }
})

class Header extends Component {

  render() {
    const { classes, t } = this.props
    
    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <HeaderNavMenu />
          
          <Typography variant="title" color="inherit" noWrap className={classes.title}>
            <Link to="/">{t('EOS_CHARGE', {currency: this.props.network.toUpperCase()})}</Link>
          </Typography>
          <HeaderNetworkMenu handleNetworkChange={this.props.handleNetworkChange}/>
          <HeaderLangMenu />

          <Button variant="extendedFab" className={classes.button} href="https://www.eosnewyork.io/" target="_blank">
            <img className={classes.headerLogo} src="./images/EOS-NY_logo.svg" alt="EOS New York logo" />
            <Typography variant="subheading" noWrap className={classes.buttonText}>
              {t('EOS_NEW_YORK')}
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default 
withNamespaces()(
  withStyles(styles)(
    Header
  )
)