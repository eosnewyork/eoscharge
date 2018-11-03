import React, { Component } from 'react'
import PageStore from '../stores/PageStore'
import { Provider } from 'mobx-react'
import Page from './Page'
import PageWrapper from './PageWrapper'
import { withNamespaces } from 'react-i18next'

class Disclaimer extends Component {
  render() {
    const {t} = this.props
    
    return (      
      <PageWrapper>
        <Provider store={PageStore}>
          <Page title={t('DISCLAIMER')} slug="disclaimer" />
        </Provider>
      </PageWrapper>
    )
  }
}

export default withNamespaces()(Disclaimer)