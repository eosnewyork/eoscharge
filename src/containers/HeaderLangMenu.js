import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ListItemText from '@material-ui/core/ListItemText'
import LanguageIcon from '@material-ui/icons/Language'
import IconButton from '@material-ui/core/IconButton'
import i18n from '../i18n'

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
    lng: i18n.language
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
  
  changeLanguage = lng => {
    i18n.changeLanguage(lng)
    this.setState({ lng: lng })
  }

  render() {
    const { classes } = this.props
    const { open, lng } = this.state
    
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
          <LanguageIcon />
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
                  <MenuList onClick={this.handleClose}> 
                    
                      <MenuItem onClick={() => this.changeLanguage('en')} selected={lng === 'en'}>
                        <ListItemText classes={{ primary: classes.primary }} primary="English (EN)" />
                      </MenuItem>
                      <MenuItem onClick={() => this.changeLanguage('zh')} selected={lng === 'zh'}>
                        <ListItemText classes={{ primary: classes.primary }} primary="Chinese (ZH)" />
                      </MenuItem>
                    
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