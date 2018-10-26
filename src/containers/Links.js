import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Page from './Page'

const styles = theme => ({
  link: {
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

const links = [
  { url: 'https://www.eosrp.io/', name: 'EOS Resource Planner' },
  { url: 'https://eos.chintai.io/exchange/EOS14D', name: 'Chintai' },
  { url: 'https://cpuemergency.com/', name: 'CPU Emergency' },
  { url: 'https://eoslaomao.com/bankofstaked', name: 'Bank of Staked' },
]

class Disclaimer extends Component {
  render() {
    const { classes } = this.props

    return (      
      <Page>
        <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
          Helpful Links
        </Typography>

        
        {links.map((link, i) => (
          <Typography key={link.url} variant="headline" color="textPrimary" gutterBottom className={classes.link}>
            <a target="_blank" rel="noopener noreferrer" href={link.url}>{link.name}</a>
          </Typography>
        ))}

        <Typography variant="body1" color="textPrimary" className={classes.disclaimer}>
          When visiting websites outside of EOS Charge, we cannot guarantee safety or validity of who they represent. Please exercise caution and be dilligent with the security of your account keys and information. Only share information with websites that you have validated for yourself.
        </Typography>

      </Page>    
    )
  }
}

export default withStyles(styles)(Disclaimer)