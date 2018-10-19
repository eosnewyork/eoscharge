import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Page from './Page'

class Disclaimer extends Component {
  render() {
    return (      
      <Page>
        <Typography variant="display3" align="center" color="textPrimary" gutterBottom>
          Disclaimer
        </Typography>

        <Typography variant="body1" color="textPrimary" gutterBottom>
        Users are hereby informed that they should take all steps necessary to ascertain that the information you receive from eoscharge.io is correct and has been verified through your own independent means, checking references, public code, blockchain history, and double-checking information with independent sources.
None of the authors, contributors, administrators, software developers, or anyone else connected with eoscharge.io, in any way whatsoever, can be responsible for your use of the information contained in or linked from eoscharge.io.
We do not make any warranties about the completeness, reliability and accuracy of this information. Any action taken upon the information on this website is strictly at your own risk, and we will not be liable for losses and damages in connection with the use of our website.
In consideration for eoscharge.io coordinating and supplying the data compiled from the public EOS blockchain, the user, developer, or subscriber acknowledges and agrees that none of the suppliers of the information:
(1) accept any responsibility or liability for the frequency of provision and accuracy of the resources or any use made of the information by the user, developer, or subscriber, whether or not arising from the negligence of any suppliers; or
(2) shall be liable for any loss of business nor any direct, indirect or consequential loss or damage resulting from any such irregularity, inaccuracy or use of the Information.
        </Typography>

        <Typography variant="body1" color="textPrimary">
          We do not use cookies nor do we store your account name nor any personal information at EOSCharge.io. Your account name is stored locally on your computer to quickly allow you to reenter it on your next visit.
        </Typography>

      </Page>    
    )
  }
}

export default Disclaimer