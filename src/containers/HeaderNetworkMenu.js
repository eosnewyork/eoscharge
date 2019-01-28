import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import Paper from '@material-ui/core/Paper'
import Popper from '@material-ui/core/Popper'
import MenuItem from '@material-ui/core/MenuItem'
import MenuList from '@material-ui/core/MenuList'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import EosIcon from "../assets/eos_icon.svg";
import BosIcon from "../assets/bos_icon.svg";
import { withNamespaces } from 'react-i18next';
import { EOS_NETWORK, BOS_NETWORK } from '../config.js';
//import { List } from 'immutable';

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

class HeaderNetworkMenu extends Component {
  
  constructor(props) {
    super(props);
    let net = EOS_NETWORK;
    if(this.props.network) {
      net = this.props.network;
    }
    this.state = {
      open: false,
      net: net,
    };
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
  
  changeNetwork = net => {
    this.props.handleNetworkChange(net);
    this.setState({ net: net });
  }

  render() {
    const { classes, t } = this.props
    const { open, net } = this.state
    const eosLogo = <img src={EosIcon} width="25" height="25" />
    const bosLogo = <img src={BosIcon} width="25" height="25" />
    let selectedLogo = eosLogo;
    switch (net){
      case BOS_NETWORK:
        selectedLogo = bosLogo;
    }
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
          {selectedLogo}
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
                    
                      <MenuItem onClick={() => this.changeNetwork(EOS_NETWORK)} selected={net === EOS_NETWORK}>
                        <ListItemIcon> {eosLogo} </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} primary={t(EOS_NETWORK.toUpperCase())} />
                      </MenuItem>
                      <MenuItem onClick={() => this.changeNetwork(BOS_NETWORK)} selected={net === BOS_NETWORK}>
                      <ListItemIcon> {bosLogo} </ListItemIcon>
                        <ListItemText classes={{ primary: classes.primary }} primary={t(BOS_NETWORK.toUpperCase() + ' (BETA)')} />
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
    HeaderNetworkMenu
  )
)
