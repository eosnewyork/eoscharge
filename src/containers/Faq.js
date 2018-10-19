import React, { Component } from 'react'
import FaqStore from '../stores/FaqStore'
import { Provider } from 'mobx-react'
import FaqList from './FaqList'
import Typography from '@material-ui/core/Typography'
import Page from './Page'

class Faq extends Component {
  render() {
    return (      
      <Page>
          
        <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
          Frequently Asked Questions
        </Typography>

        <Provider store={FaqStore}>
          <FaqList />
        </Provider>

      </Page>
    )
  }
}

export default Faq