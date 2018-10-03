import React, {Component} from 'react'
import {inject, observer} from 'mobx-react'
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import CheckIcon from '@material-ui/icons/Check';
import SearchIcon from '@material-ui/icons/Search';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const styles = theme => ({
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  buttonWrapper: {
    position: 'relative',
    marginLeft: theme.spacing.unit * 4

  },  
  buttonProgress: {
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1
  },
  form: {
    marginLeft: theme.spacing.unit * 4,
    marginRight: theme.spacing.unit * 4
  },
  formInputs: {
    display: 'flex',
    justifyContent: 'space-around'
  }
})

class AccountForm extends Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.store.loadAccount()
  }  

  componentDidMount() {
    
  }

  componentWillReact() {
    console.log("Account will rerender")
  }

  handleAcctNameChange = e => {
    this.props.store.setAccountName(e.target.value)
  }

  render() {
    const {store} = this.props
    const {classes} = this.props

    return (
      <React.Fragment>
        <form className={classes.form} onSubmit={e => this.handleSubmit(e)}>
          <div className={classes.formInputs}>
            <FormControl margin="none" required fullWidth>
              <InputLabel htmlFor="acct_name">EOS Account Name</InputLabel>
              <Input id="acct_name" 
                      value={store.accountName}
                      placeholder="Ex: eosnewyorkio" 
                      autoFocus 
                      onChange={this.handleAcctNameChange} />
            </FormControl>
            <div className={classes.buttonWrapper}>
              <Button variant="fab" 
                      color="primary" 
                      type="submit" 
                      disabled={['pending', 'error'].includes(store.state)}>
                {['pending', 'init'].includes(store.state) ? <SearchIcon /> :
                  ['error'].includes(store.state) ? <PriorityHighIcon /> :                     
                  <CheckIcon />}
              </Button>
              {['pending'].includes(store.state) &&
                <CircularProgress size={68} className={classes.buttonProgress} />}
            </div>
          </div>
          {['error'].includes(store.state) && 
              <FormLabel error={true}>{store.error.message}</FormLabel>}
        </form>
      </React.Fragment>
    )
  }
}

export default inject('store')(withStyles(styles)(observer(AccountForm)))