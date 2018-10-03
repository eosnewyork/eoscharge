import React from 'react'
import {render} from 'react-dom'
import 'typeface-roboto'
import App from "./containers/App";
import {configure} from 'mobx'
import {Provider} from "mobx-react";
import ActionStore from "./stores/ActionStore";
import AccountStore from "./stores/AccountStore";

configure({enforceActions: 'always'})

if (process.env.NODE_ENV !== 'production') {
  //const {whyDidYouUpdate} = require('why-did-you-update');
  //whyDidYouUpdate(React);
}

const app = 
  <Provider actionStore={ActionStore} acctStore={AccountStore}>
    <App />
  </Provider>

render(app, document.getElementById("root"))