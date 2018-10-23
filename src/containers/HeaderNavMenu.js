import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
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
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  linkStyle: {
    textDecoration: 'none',
    display: 'block'
  }
})

class HeaderNavMenu extends Component {
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
      <React.Fragment>
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
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(HeaderNavMenu)