import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormLabel from '@material-ui/core/FormLabel'

const styles = theme => ({
  progressWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  content: {
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
  disclaimer: {
    marginTop: theme.spacing.unit * 3
  }
})

class Page extends Component {
  componentDidMount() {
    this.props.store.loadPages()
    this.props.store.setSlug(this.props.slug)
  }

  render() {
    const {classes, store, title} = this.props
    
    return (      
      <React.Fragment>
        <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
          {title}
        </Typography>

      {['pending'].includes(store.state) &&
        <div className={classes.progressWrapper}>
          <CircularProgress size={68} />
        </div>
      }

      {['done'].includes(store.state) && store.pages.length > 0 &&
        <Typography className={classes.content} 
                    dangerouslySetInnerHTML={{__html: store.localizedPage.content}}>
        </Typography>        
      }
  
      {['error'].includes(store.state) && 
        <FormLabel error={true}>{store.error.message}</FormLabel>}

      </React.Fragment>
    )
  }
}

export default inject('store')(withStyles(styles)(observer(Page)))