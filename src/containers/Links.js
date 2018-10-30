import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'
import Page from './Page'
import { withNamespaces } from 'react-i18next'

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

class Links extends Component {
  render() {
    const { classes, t } = this.props

    return (      
      <Page>
        <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
          {t('HELPFUL_LINKS')}
        </Typography>

        
        {links.map((link, i) => (
          <Typography key={link.url} variant="headline" color="textPrimary" gutterBottom className={classes.link}>
            <a target="_blank" rel="noopener noreferrer" href={link.url}>{link.name}</a>
          </Typography>
        ))}

        <Typography variant="body1" color="textPrimary" className={classes.disclaimer}>
          {t('LINKS_DISCLAIMER')}
        </Typography>

      </Page>    
    )
  }
}

export default 
withNamespaces()(
  withStyles(styles)(
    Links
  )
)