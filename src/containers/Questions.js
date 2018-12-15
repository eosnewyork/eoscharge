import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withNamespaces } from 'react-i18next'

const styles = theme => ({
  youtubeVid: {
    width: '65vw',
    height: 'calc(65vw/1.77777778)',
    maxWidth: 560,
    maxHeight: 315
  },
  cornerRibbon: {
    width: 200,
    background: '#EDEDED',
    position: 'absolute',
    top: 35,
    left: -47,
    textAlign: 'center',
    lineHeight: 50,
    letterSpacing: 1,
    transform: 'rotate(-45deg)',
    boxShadow: '0 0 3px rgba(27, 90, 108, .7)',
    color: theme.palette.primary.main,
    cursor: 'pointer'
  },
  buttonText: {
    marginTop: '0.25em',
    color: theme.palette.primary.main,
    fontWeight: 700,
    fontSize: '0.9rem',
    textTransform: 'uppercase'
  }
})

class Questions extends Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const {classes, t} = this.props
    
    return (
      <div>
        <div className={classes.cornerRibbon}>
          <Typography variant="subheading" align="center" color="textPrimary" className={classes.buttonText} gutterBottom onClick={this.handleClickOpen}>
            {t('WATCH_VIDEO')}
          </Typography>
        </div>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title">
          <DialogContent>
            <iframe title="explainer-vid" className={classes.youtubeVid} src="https://www.youtube.com/embed/iImPruyt2XQ" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="true"></iframe>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              {t('CLOSE')}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default 
withNamespaces()(
  withStyles(styles)(
    Questions
  )
)
