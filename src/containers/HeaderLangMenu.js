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
import { withNamespaces } from 'react-i18next'

const styles = theme => ({
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  linkStyle: {
    textDecoration: 'none',
    display: 'block'
  },
  headerButton: {
    marginRight: theme.spacing.unit
  },
  popper: {
    zIndex: 1000
  }
})

class HeaderLangMenu extends Component {
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
    const { classes, t } = this.props
    const { open, lng } = this.state
    
    return (
      <React.Fragment>
        <IconButton 
          className={classes.headerButton}
          buttonRef={node => {
            this.anchorEl = node;
          }}
          aria-owns={open ? 'menu-list-grow' : null}
          aria-haspopup="true"
          onClick={this.handleToggle}
          color="inherit">
          <LanguageIcon />
        </IconButton>
        
        <Popper open={open} anchorEl={this.anchorEl} transition disablePortal className={classes.popper}>
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
                        <ListItemText classes={{ primary: classes.primary }} primary={t('ENGLISH')} />
                      </MenuItem>
                      <MenuItem onClick={() => this.changeLanguage('zh')} selected={lng === 'zh'}>
                        <ListItemText classes={{ primary: classes.primary }} primary={t('CHINESE')} />
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

export default 
withNamespaces()(
  withStyles(styles)(
    HeaderLangMenu
  )
)
