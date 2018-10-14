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
  question: {
    marginBottom: theme.spacing.unit * 3,
    '& a': {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
})

class FaqList extends Component {
  componentDidMount() {
    this.props.store.loadFaqs()
  }

  render() {
    const {classes, store} = this.props
    
    return (      
      <React.Fragment>
      {['pending'].includes(store.state) &&
        <div className={classes.progressWrapper}>
          <CircularProgress size={68} />
        </div>
      }

      {['done'].includes(store.state) && store.faqs.length > 0 &&
        <div>
        {store.faqs.map((faq, i) => (
          <div key={faq._id} className={classes.question}>
            <Typography variant="display1" gutterBottom>
              {`Q${i+1}. `}{faq.metadata.question}
            </Typography>
            <Typography component="div" variant="subheading" dangerouslySetInnerHTML={{__html: faq.metadata.answer}}>
            </Typography>
          </div>
        ))}
        </div>
      }
  
      {['error'].includes(store.state) && 
        <FormLabel error={true}>{store.error.message}</FormLabel>}

      </React.Fragment>
    )
  }
}

export default inject('store')(withStyles(styles)(observer(FaqList)))