import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import HomeIcon from '@material-ui/icons/Home'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import IconButton from '@material-ui/core/IconButton'
import { Link } from 'react-router-dom'

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
  },
  linkStyle: {
    textDecoration: 'none',
    display: 'block'
  }
})

class App extends Component {
  state = {
    open: false,
  }

  handleToggle = () => {
    this.setState(state => ({ open: !state.open }))
  }

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return
    }

    this.setState({ open: false })
  }
  
  render() {
    const { classes } = this.props
    const { open } = this.state
    
    return (
      <AppBar position="static" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <IconButton
                buttonRef={node => {
                  this.anchorEl = node;
                }}
                aria-owns={open ? 'menu-list-grow' : null}
                aria-haspopup="true"
                onClick={this.handleToggle}
                color="inherit"
              >
            <MenuIcon />
          </IconButton>
          
          <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      <Link to="/" className={classes.linkStyle}>
                        <MenuItem onClick={this.handleClose}>
                          <ListItemIcon className={classes.icon}>
                            <HomeIcon />
                          </ListItemIcon>
                          <ListItemText classes={{ primary: classes.primary }} inset primary="Home" />
                        </MenuItem>
                      </Link>
                      <Link to="/faq" className={classes.linkStyle}>
                        <MenuItem onClick={this.handleClose}>
                          <ListItemIcon className={classes.icon}>
                            <QuestionAnswerIcon />
                          </ListItemIcon>
                          <ListItemText classes={{ primary: classes.primary }} inset primary="FAQ" />
                        </MenuItem>
                      </Link>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>

          <Typography variant="title" color="inherit" noWrap className={classes.title}>
            EOS Charge
          </Typography>
        
          <Button variant="extendedFab" className={classes.button} href="https://www.eosnewyork.io/" target="_blank">
            <img className={classes.headerLogo} src="./images/EOS-NY_logo.svg" alt="EOS New York logo" />
            <Typography variant="subheading" noWrap className={classes.buttonText}>
              EOS New York
            </Typography>
          </Button>
        </Toolbar>
      </AppBar>
    )
  }
}

export default withStyles(styles)(App)