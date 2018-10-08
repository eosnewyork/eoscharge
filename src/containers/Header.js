import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'

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
    flexGrow: 1
  },
  button: {
    backgroundColor: theme.palette.background.default,
  },
  buttonText: {
    marginLeft: theme.spacing.unit,
    color: theme.palette.primary.main,
    fontWeight: 700
  },
  headerLogo: {
    height: theme.spacing.unit * 4
  }
})

class App extends Component {
  render() {
    const {classes} = this.props
    
    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <FlashOnIcon className={classes.icon} />
          <Typography variant="title" color="inherit" noWrap className={classes.title}>
            EOS Charge
          </Typography>
        
          <Button variant="extendedFab" className={classes.button} href="https://www.eosnewyork.io/" target="_blank">
            <img className={classes.headerLogo} src="./images/EOS-NY_logo.svg" alt="EOS New York logo" />
            <Typography variant="button" className={classes.buttonText}>
              EOS New York
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>      
    )
  }
}

export default withStyles(styles)(App)