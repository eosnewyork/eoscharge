import React, { Component } from 'react'
import PageWrapper from './PageWrapper'
import PageStore from '../stores/PageStore'
import { Provider } from 'mobx-react'
import Page from './Page'
import { withNamespaces } from 'react-i18next'

class Links extends Component {
  render() {
    const { t } = this.props

    return (      
      <PageWrapper>
        <Provider store={PageStore}>
          <Page title={t('HELPFUL_LINKS')} slug="links" />
        </Provider>
      </PageWrapper>
    )
  }
}

export default withNamespaces()(Links)