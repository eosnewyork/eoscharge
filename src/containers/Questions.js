import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  questionCardWrapper: {
    width: 600,
    position: 'absolute',
    margin: 'auto',
    left: 0,
    right: 0,
    marginTop: theme.spacing.unit * -2,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: 0,
    }
  },
  questionCard: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    '& a': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    }
  },
  youtubeVid: {
    width: '65vw',
    height: 'calc(65vw/1.77777778)',
    maxWidth: 560,
    maxHeight: 315
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
    const {classes} = this.props
    
    return (
      <div>
        <div className={classes.questionCardWrapper}>
          <Card className={classes.questionCard} elevation={8}>
            <CardContent> 
              <Typography variant="display2" align="center" color="textPrimary" gutterBottom>
                Questions?
              </Typography>
              <Grid container spacing={16} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    Watch the video
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    <Link to="/faq">Read the FAQ</Link>
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
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
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

export default withStyles(styles)(Questions)