import React, { Component } from 'react'
import FaqStore from '../stores/FaqStore'
import { Provider } from 'mobx-react'
import FaqList from './FaqList'
import Typography from '@material-ui/core/Typography'
import PageWrapper from './PageWrapper'
import { withNamespaces } from 'react-i18next'

class Faq extends Component {
  render() {
    const {t} = this.props
    
    return (      
      <PageWrapper>
          
        <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
          {t('FREQ_ASKED_QUES')}
        </Typography>

        <Provider store={FaqStore}>
          <FaqList />
        </Provider>

      </PageWrapper>
    )
  }
}

export default withNamespaces()(Faq)