import React, {Component} from 'react'
import {Provider} from "mobx-react";
import AccountStore from "../stores/AccountStore";
import AccountForm from './AccountForm';
import AccountResources from './AccountResources';

class Account extends Component {  

  render() {
    return (
      <div>
            <Provider store={AccountStore}>
              <AccountForm />
            </Provider>
            <Provider store={AccountStore}>
              <AccountResources />
            </Provider>        
      </div>
    )
  }
}

export default Account