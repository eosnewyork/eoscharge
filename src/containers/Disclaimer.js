import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Page from './Page'
import { withNamespaces } from 'react-i18next'

class Disclaimer extends Component {
  render() {
    const {t} = this.props
    
    return (      
      <Page>
        <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
          {t('DISCLAIMER')}
        </Typography>

        <Typography variant="body1" color="textPrimary" gutterBottom>
          {t('DISCLAIMER_PARA_1')}
        </Typography>

        <Typography variant="body1" color="textPrimary">
          {t('DISCLAIMER_PARA_2')}
        </Typography>

      </Page>    
    )
  }
}

export default withNamespaces()(Disclaimer)